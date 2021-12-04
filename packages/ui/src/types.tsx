import { ethers } from 'ethers'

/**
 * API Options
 */
export interface APIOptions {
  abi: ethers.ContractInterface
  client: APIClientOptions
  contractAddress: string
}

/**
 * API Client Options
 */
export interface APIClientOptions {
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
