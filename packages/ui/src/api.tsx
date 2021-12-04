import { ethers } from 'ethers'
// @ts-expect-error
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { APIClientOptions, NFTMetadataRequest } from './types'
import depJson from './deployment.json'

export type ClientAPI = ReturnType<typeof createClientAPI>

/**
 * Client side API.
 * @returns API
 */
export function createClientAPI(options?: APIClientOptions) {
  const ethFormat: typeof ethers.utils.formatEther = ethers.utils.formatEther
  const debug = console.log
  const clients = createClients(options)

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
    return wallet.connect(clients.provider)
  }

  const _createUserContract = (signer: ethers.Signer) => {
    const { address, abi } = clients.contract
    return new ethers.Contract(address, abi, signer)
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

    const result = await clients.ipfs.store(req)

    const FRIENDLY_TOKEN_URI =
      TOKEN_URI_BASE_URL + result.ipnft + '/metadata.json' // Don't use 'ipfs://' because of browsers

    const nftMetaView = {
      ...result.data,
      tokenURI: FRIENDLY_TOKEN_URI,
    }

    return nftMetaView
  }

  /**
   * Fetches information from the network.
   * @returns Network information
   */
  const fetchNetwork = async () => {
    const provider = clients.provider
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
    const provider = clients.provider
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
    const provider = clients.provider
    const blockNum = await provider.getBlockNumber() // Current block #
    const block = await provider.getBlock(blockHashOrBlockTag || blockNum)
    const blockTrans = await provider.getBlockWithTransactions(
      blockHashOrBlockTag || blockNum
    )
    return { block, blockTrans }
  }

  const timeout = (sec: number) => new Promise((r) => setTimeout(r, sec * 1000))

  const api = {
    createUserAccount,
    mint,
    fetchNetwork,
    fetchTransaction,
    fetchBlock,
    timeout,
    clients,
  }

  return api
}

/**
 * Creates API clients.
 * @param cliOpts API Client options
 * @returns
 */
const createClients = (options: Partial<APIClientOptions> = {}) => {
  // Init defaults
  const IPFS_ID = process.env.REACT_APP_INFURA_IPFS_ID
  const IPFS_KEY = process.env.REACT_APP_INFURA_IPFS_KEY
  const ETHERSCAN_KEY = process.env.REACT_APP_INFURA_ETHERSCAN_KEY
  const INFURA_ID = process.env.REACT_APP_INFURA_ID
  const NFT_STRORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY
  const defaultProviders = {
    etherscan: ETHERSCAN_KEY,
    infura: INFURA_ID,
  }
  const auth = 'Authorization: Basic ' + btoa(`${IPFS_ID}:${IPFS_KEY}`)
  const defaultIpfsOptions = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      Authorization: auth,
    },
  }
  const defaultClientOpts = {
    network: depJson.network ? depJson.network : 'localhost',
    ipfs: defaultIpfsOptions,
    nftStorage: NFT_STRORAGE_KEY,
    provider: defaultProviders,
  }
  const defaultOpts = {
    client: defaultClientOpts,
    contractAddress: depJson.address,
    abi: depJson.abi,
  }

  const opts = Object.assign(defaultOpts, options)

  const nftStorageClient = new NFTStorage({ token: opts.nftStorage || '' })

  const provider = ethers.providers.getDefaultProvider(
    opts.network,
    opts.provider
  )

  return {
    ipfs: nftStorageClient, // TODO: nftStorageClient || HTTPIPFSClient
    provider,
    contract: {
      abi: opts.abi,
      network: opts.network,
      address: opts.contractAddress,
    },
  }
}
