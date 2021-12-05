import depJson from './deployment.json'
import dotenv from 'dotenv'
dotenv.config()

const IPFS_ID = process.env.REACT_APP_INFURA_IPFS_ID
const IPFS_KEY = process.env.REACT_APP_INFURA_IPFS_KEY
const ETHERSCAN_KEY = process.env.REACT_APP_INFURA_ETHERSCAN_KEY
const INFURA_ID = process.env.REACT_APP_INFURA_ID
// const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
// const INFURA_ROPSTEN_URL = `https://ropsten.infura.io/v3/${INFURA_ID}`

const providerOptions = {
  etherscan: ETHERSCAN_KEY,
  infura: INFURA_ID,
}

// const infuraOptions = {
//   id: INFURA_ID,
//   key: INFURA_KEY,
//   url: INFURA_ROPSTEN_URL,
// }

// const etherscanOptions = {
//   key: ETHERSCAN_KEY,
// }

const auth = 'Authorization: Basic ' + btoa(`${IPFS_ID}:${IPFS_KEY}`)

const ipfsOptions = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    Authorization: auth,
  },
}

const api = {
  network: depJson.network ? depJson.network : 'localhost',
  ipfs: ipfsOptions,
  provider: providerOptions,
}

export type Confg = typeof config

export const config = {
  deployment: depJson,
  api: api,
}
