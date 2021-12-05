import type * as view from './components'
import * as React from 'react'
import { ethers } from 'ethers'
import { API } from './api'
import { config } from './config'

const api = API(config.api)

const debug = console.log

type AppState = {
  init: boolean
  networkName: string
  options?: any
  provider: ethers.providers.BaseProvider
  network: {
    etherPrice: number
    blockNumber: number
    network: ethers.providers.Network
    blockWithTransactions: any
  }
}

const useApp = (networkName = 'ropsten', options?: any) => {
  const initState = {
    init: true,
    networkName,
    options,
  } as AppState
  const [state, setState] = React.useState(initState)

  const init = async () => {
    debug('Starting init...')
    try {
      if (state.init) {
        await timeout(4)
        debug('Getting provider...')
        const provider = createProvider(networkName, options)
        debug('Fetching network...')
        await timeout(4)
        const resnetwork = await fetchNetwork(provider)
        await timeout(4)
        debug('Setting state...')
        setState({
          ...state,
          network: resnetwork,
          provider,
          init: false,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    if (state.init) {
      init()
    }
  }, [])

  return state
}

/**
 * Form logic and handlers.
 * @param ipfsId IPFS ID
 * @param ipfsKey IPFS API KEY
 * @returns The form values from user
 */
const useForm = (ipfsId?: string, ipfsKey?: string) => {
  const initialVals: view.FormVals = {
    name: '',
    description: '',
    file: '',
    loading: false,
    error: '',
  }
  const [vals, setVals] = React.useState(initialVals)

  const nftMetaViewInitialVals: view.INFTMeta = {
    name: '',
    description: '',
    image: '',
    tokenURI: '',
  }
  const [nftMeta, setNftMeta] = React.useState(nftMetaViewInitialVals)

  const handleDrop: view.HandleDrop = (e) => {
    const files = e.target.files as FileList
    setVals({
      ...vals,
      file: files[0],
    })
  }

  const handleChange: view.HandleChange = (e) => {
    setVals({
      ...vals,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit: view.HandleSubmit = async (e) => {
    e.preventDefault()
    if (!ipfsId || !ipfsKey) {
      setVals({
        ...vals,
        error: 'IPFS environment vars not set.',
      })
      return
    }
    setVals({ ...vals, loading: true })
    // Post data to IPFS
    const result = await addNFTMetaToIPFS(ipfsId, ipfsKey, vals)
    // Update state
    setNftMeta(result)
    setVals({ ...vals, loading: false })
  }

  return {
    handleChange,
    handleDrop,
    handleSubmit,
    formVals: vals,
    nftMeta,
  }
}

export const hooks = {
  useApp,
}

// interface API {
//   provider: ethers.providers.BaseProvider
//   ipfsClient: ipfsClient.IPFSHTTPClient
//   addNFTMetaToIPFS: typeof addNFTMetaToIPFS
//   getProvider: typeof createProvider
//   fetchNetwork: typeof fetchNetwork
//   fetchTransaction: typeof fetchTransaction
// }

// type provider = API['provider']

// export const addNFTMetaToIPFS = async (
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

// export const createProvider = (network: string, options: any) => {
//   const providers = ethers.providers
//   return providers.getDefaultProvider(network, options)
// }

// const fetchNetwork = async (provider: provider) => {
//   await timeout(1)
//   debug('Fetching...')
//   const eprice = await provider.getEtherPrice()
//   const bn = await provider.getBlockNumber()
//   const network = await provider.getNetwork()
//   const bt = await provider.getBlockWithTransactions(bn)
//   const result = {
//     etherPrice: eprice,
//     blockNumber: bn,
//     network,
//     blockWithTransactions: '',
//   }
//   return result
// }

// const fetchTransaction = async (provider: provider, hash: string) => {
//   const transaction = await provider.getTransaction(hash)
//   const receipt = await provider.getTransactionReceipt(hash)
//   return {
//     transaction,
//     receipt,
//   }
// }

// const fetchAccount = async (provider: provider) => {}

// const timeout = (sec: number) => new Promise((r) => setTimeout(r, sec * 1000))
