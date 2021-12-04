import { ethers } from 'ethers'

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

export type NFTMetadataRequest = {
  name: string
  description: string
  file: File | Blob
}

export type EventHandleSubmit = React.FormEventHandler<HTMLFormElement>

export type EventHandleChange = React.ChangeEventHandler<HTMLInputElement>

export type HookState = { loading: boolean; error: unknown | Error | unknown }

export type NFTMetadata = {
  name: string
  description: string
  file: File | string | Blob
}

export type FormState = NFTMetadata & HookState & { prevImgURL: string }

export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T
