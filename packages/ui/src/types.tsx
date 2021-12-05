import { ethers } from 'ethers'
import { APIClient } from './api/api'
import {
  // TransactionResponse,
  BlockWithTransactions,
} from '@ethersproject/abstract-provider/lib.esm/index'
import type { FetchNetworkResponse as FNR } from './api/api'

export type FetchNetworkHandler = APIClient['fetchNetwork']
export type FetchNetworkResponse =
  | Promise<null | undefined | FNR>
  | null
  | undefined
// export type { FetchNetworkResponse } from './api'
export type { APIClient } from './api/api'

// export type FetchNetworkResponse = ReturnType<FetchNetworkHandler>
// type NetworkState = Unwrap<typeof api.fetchNetwork> | null
// export type ClientAPI = ReturnType<typeof createClientAPI>

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
