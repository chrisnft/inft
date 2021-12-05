import type * as view from './components'
import * as ipfsClient from 'ipfs-http-client'
import { ethers } from 'ethers'

export type APIInterface = typeof API

type APIOptions = ClientOptions

/**
 * Creates an RPC API for requests and responsts to network.
 * @param provider Provider
 * @returns API
 */
export function API(opts: APIOptions) {
  const debug = console.log

  const { ipfs, provider } = createClients(opts)

  /**
   * Adds the metadata to IPFS
   * @param id IPFS id
   * @param key IPFS key
   * @param data The client's data to add
   * @returns
   */
  const addNFTMetadataToIPFS = async (
    id: string,
    key: string,
    data: view.FormVals
  ) => {
    const TOKEN_URI_BASE_URL = 'https://ipfs.io/ipfs/'

    const file = data.file as File

    const resFile = await ipfs.add(file) // Add image

    await timeout(1)

    const req = {
      name: data.name,
      description: data.description,
      image: TOKEN_URI_BASE_URL + resFile.path,
    }
    const resMeta = await ipfs.add(JSON.stringify(req)) // NFT METADATA

    const nftMetaView = {
      name: req.name,
      description: req.description,
      image: req.image,
      tokenURI: TOKEN_URI_BASE_URL + resMeta.path,
    }

    return nftMetaView
  }

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
      blockWithTransactions: '',
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

  const fetchContract = async () => {}

  const createWallet = async () => {}

  const fetchAccount = async () => {}

  const timeout = (sec: number) => new Promise((r) => setTimeout(r, sec * 1000))

  return {
    addNFTMetadataToIPFS,
    fetchNetwork,
    fetchTransaction,
    fetchBlock,
    timeout,
    provider,
  }
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
}

/**
 *
 * @param cliOpts API Client options
 * @returns
 */
const createClients = (cliOpts: ClientOptions) => {
  const createIPFSClient = () => {
    const client = ipfsClient.create(cliOpts.ipfs)
    return client
  }

  const createDefaultProvider = () => {
    return ethers.providers.getDefaultProvider(
      cliOpts.network,
      cliOpts.provider
    )
  }

  const ipfs = createIPFSClient()
  const provider = createDefaultProvider()

  return {
    ipfs,
    provider,
  }
}

// const _createIPFSClient = ()=>{
//   const auth: string = 'Authorization: Basic ' + btoa(`${id}:${key}`)
//   const TOKEN_URI_BASE_URL = 'https://ipfs.io/ipfs/'

//   const opts: ipfsClient.Options = {
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       Authorization: auth,
//     },
//   }
//   const client = ipfsClient.create(opts)
// }

//  /**
//  * Adds the metadata to IPFS
//  * @param id IPFS id
//  * @param key IPFS key
//  * @param data The client's data to add
//  * @returns
//  */
// const addNFTMetadataToIPFS = async (
//   id: string,
//   key: string,
//   data: view.FormVals
// ) => {
//   const auth: string = 'Authorization: Basic ' + btoa(`${id}:${key}`)
//   const TOKEN_URI_BASE_URL = 'https://ipfs.io/ipfs/'

//   const opts: ipfsClient.Options = {
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       Authorization: auth,
//     },
//   }
//   const client = ipfsClient.create(opts)
//   const file = data.file as File

//   const resFile = await client.add(file) // Add image

//   await timeout(1)

//   const req = {
//     name: data.name,
//     description: data.description,
//     image: TOKEN_URI_BASE_URL + resFile.path,
//   }
//   const resMeta = await client.add(JSON.stringify(req)) // NFT METADATA

//   const nftMetaView = {
//     name: req.name,
//     description: req.description,
//     image: req.image,
//     tokenURI: TOKEN_URI_BASE_URL + resMeta.path,
//   }

//   return nftMetaView
// }
