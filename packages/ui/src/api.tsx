import { ethers } from 'ethers'
// @ts-expect-error
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
// import { NFTStorage } from 'nft.storage' // Only works with webpack V5

const ethFormat: typeof ethers.utils.formatEther = ethers.utils.formatEther

// export type API = typeof API

interface APIConfig {
  abi: ethers.ContractInterface
  client: ClientOptions
  contractAddress: string
}

/**
 * Creates an RPC API for requests and responsts to network.
 * @param provider Provider
 * @returns API
 */
export function API(config: APIConfig) {
  // Private scope
  const debug = console.log
  const { ipfs, provider } = createClients(config.client)

  const createUserAccount = async (key?: string) => {
    const wallet = _createUserWallet(key)
    const contract = _createUserContract(wallet)
    const wballance = await wallet.getBalance()
    const balance = ethFormat(wballance)
    if (wallet && contract) return { wallet, contract, balance }
  }

  const _createUserWallet = (key?: string) => {
    let wallet
    if (key) {
      wallet = new ethers.Wallet(key)
    } else {
      wallet = ethers.Wallet.createRandom()
    }
    return wallet.connect(provider)
  }

  const _createUserContract = (signer: ethers.Signer) => {
    return new ethers.Contract(config.contractAddress, config.abi, signer)
  }

  type NFTMetadataRequest = {
    name: string
    description: string
    file: File | Blob
  }

  const mint = async (
    data: any,
    contract: ethers.Contract,
    userAddress: string
  ) => {
    const meta = await _addNFTMetadataToIPFS(data)
    const tokenURI = meta.tokenURI
    const result = await contract.mint(userAddress, tokenURI)
    return { metadata: meta, mintResult: result }
  }

  /**
   * Adds the metadata to IPFS
   * @param id IPFS id
   * @param key IPFS key
   * @param data The client's data to add
   * @returns
   */
  const _addNFTMetadataToIPFS = async (data: NFTMetadataRequest) => {
    const TOKEN_URI_BASE_URL = 'https://ipfs.io/ipfs/'

    const file = data.file as File

    const req = {
      name: data.name,
      description: data.description,
      image: file,
    }

    const result = await ipfs.store(req)

    const FRIENDLY_TOKEN_URI =
      TOKEN_URI_BASE_URL + result.ipnft + '/metadata.json' // Don't use 'ipfs://' because of browsers

    const nftMetaView = {
      ...result.data,
      tokenURI: FRIENDLY_TOKEN_URI,
    }

    return nftMetaView
  }

  // // IF USING IPFSHTTPCLIENT
  // const _ipfsAdd = ()=>{
  //   const resFile = await ipfs.add(file, { pin: true }) // Add and PIN image

  //   console.log(resFile)

  //   await timeout(1)

  //   const req = {
  //     name: data.name,
  //     description: data.description,
  //     image: TOKEN_URI_BASE_URL + resFile.path,
  //   }
  //   const resMeta = await ipfs.add(JSON.stringify(req), { pin: true }) // ADD AND PIN NFT METADATA
  // }

  /**
   * Fetches information from the network.
   * @returns Network information
   */
  const fetchNetwork = async () => {
    await timeout(1)
    debug('Fetching...')
    const eprice = await provider.getEtherPrice()
    const bn = await provider.getBlockNumber()
    const network = await provider.getNetwork()
    const bt = await provider.getBlockWithTransactions(bn)
    const result = {
      etherPrice: eprice,
      blockNumber: bn,
      network,
      blockWithTransactions: bt,
    }
    return result
  }

  /**
   * Fetches the transaction from the hash
   * @param hash Hash or number to the block
   * @returns The transactin and receipt
   */
  const fetchTransaction = async (hash: string) => {
    const transaction = await provider.getTransaction(hash)
    const receipt = await provider.getTransactionReceipt(hash)
    return {
      transaction,
      receipt,
    }
  }

  /**
   * Fetches block from network.
   * @param prov Provider
   * @param blockHashOrBlockTag The block number or hashtag
   * @returns Block data
   */
  const fetchBlock = async (blockHashOrBlockTag: ethers.providers.BlockTag) => {
    const blockNum = await provider.getBlockNumber() // Current block #
    const block = await provider.getBlock(blockHashOrBlockTag || blockNum)
    const blockTrans = await provider.getBlockWithTransactions(
      blockHashOrBlockTag || blockNum
    )
    return { block, blockTrans }
  }

  const timeout = (sec: number) => new Promise((r) => setTimeout(r, sec * 1000))

  const pub = {
    createUserAccount,
    mint,
    fetchNetwork,
    fetchTransaction,
    fetchBlock,
    timeout,
    provider,
  }

  return pub
}

interface ClientOptions {
  network: string

  ipfs: {
    host: string
    port: number
    protocol: string
    headers: {
      Authorization: string
    }
  }

  provider: {
    etherscan: string | undefined
    infura: string | undefined
  }

  nftStorage: string | undefined
}

/**
 *
 * @param cliOpts API Client options
 * @returns
 */
const createClients = (cliOpts: ClientOptions) => {
  // const createHttpIPFSClient = () => {
  //   const client = createIPFS(cliOpts.ipfs)
  //   return client
  // }

  const createNFTStorageClient = () => {
    const apiKey = cliOpts.nftStorage
    const client = new NFTStorage({ token: apiKey || '' })
    // async function main() {
    //   var url = "https://api.nft.storage/upload";
    //   var data = new Blob([bytes], { type: "image/png"});

    //   fetch(url, {
    //       "method": "POST",
    //       "headers": {
    //            "Authorization": "Bearer",
    //            "Content-Type": "application/x-www-form-urlencoded"
    //          },
    //        "body": data,
    //     })
    //    .then(response => {
    //         console.log(response);
    //    })
    return client
  }

  const createDefaultProvider = () => {
    return ethers.providers.getDefaultProvider(
      cliOpts.network,
      cliOpts.provider
    )
  }

  const ipfs = createNFTStorageClient()
  const provider = createDefaultProvider()

  return {
    ipfs,
    provider,
  }
}
