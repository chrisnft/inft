import { ethers } from 'ethers'
import React, { useState, useEffect } from 'react'
// import { api } from '.'
// import { createClientAPI } from './api'
// const api = createClientAPI()
import { APIClient, FetchNetworkHandler, FetchNetworkResponse } from './types'
const debug = console.log

// TODO: V2 Seperate state and use generics for hooks
// ReturnType
type EventHandleSubmit = React.FormEventHandler<HTMLFormElement>
type EventHandleChange = React.ChangeEventHandler<HTMLInputElement>
type HookState = { loading: boolean; error: unknown | Error | unknown }
type NFTMetadata = {
  name: string
  description: string
  file: File | string | Blob
}
type FormState = NFTMetadata & HookState & { prevImgURL: string }
type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T

export function useMintOutput<T>(mintData: T) {
  const ref = React.useRef<HTMLAnchorElement>(null)

  const outputToFile = (
    data: any,
    element?: React.RefObject<HTMLAnchorElement>
  ) => {
    if (element && element.current) {
      // console.log(data)
      const output = JSON.stringify(data, null, 2)
      const file = new Blob([output], { type: 'text/plain' })
      const current = element.current
      current.href = URL.createObjectURL(file)
      current.download = 'mint-result.json'
      current.click()
    }
  }

  const handleOutputSave = () => {
    outputToFile(mintData, ref)
  }

  useEffect(() => {
    debug('Effect UseMintOutput standing by...')
    if (mintData) {
      debug('Effect UseMintOutput fire...')
      outputToFile(mintData, ref)
      return () => {
        // Cleanup
      }
    }
  }, [mintData])

  return { ref, handleOutputSave }
}

export function useTab<T>(data: T) {
  const [state, setState] = React.useState<T>()
  setState(data)
  return state
}

type AccountState = Unwrap<typeof api.createUserAccount>
export const useAccount = (key?: string) => {
  const [state, setState] = useState<AccountState>(undefined)

  React.useEffect(() => {
    try {
      api.createUserAccount(key).then((v) => {
        if (v) {
          setState({ ...state, ...v })
        }
      })
    } catch (e) {
      debug(e)
    }
  }, [])

  return state
}

/**
 * Form logic and handlers.
 * @param contract User connected contract
 * @param userAddress User address
 * @returns The form values from user
 */
export const useMintForm = (
  contract?: ethers.Contract,
  userAddress?: string
) => {
  type MintResult = Unwrap<typeof api.mint> | null
  const [nftMeta, setNftMeta] = useState<MintResult>(null)

  const initVals: FormState = {
    name: '',
    description: '',
    file: '',
    prevImgURL: '',
    loading: false,
    error: '',
  }

  const [vals, setVals] = useState<FormState>(initVals)

  const handleFile: EventHandleChange = (e) => {
    const files = e.target.files as FileList
    const prevImgURL = URL.createObjectURL(files[0])
    setVals({
      ...vals,
      prevImgURL,
      file: files[0],
    })
  }

  const handleChange: EventHandleChange = (e) => {
    setVals({
      ...vals,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit: EventHandleSubmit = async (e) => {
    e.preventDefault()
    debug('Minting....')
    if (contract && userAddress) {
      setVals({ ...vals, loading: true })
      // await api.timeout(2)
      try {
        const result = await api.mint(vals, contract, userAddress)
        setNftMeta({ ...result })
      } catch (e) {
        console.log(e)
        setVals({ ...vals, loading: false, error: String(e) })
      }
    }
    // Update state
    setVals({ ...vals, loading: false })
  }

  return {
    handleChange,
    handleFile,
    handleSubmit,
    formVals: vals,
    nftMeta,
  }
}

export const useNetwork = () => {
  type NetworkState = Unwrap<api.fetchNetwork> | null
  const [state, setState] = useState<NetworkState>(null)
  React.useEffect(() => {
    debug('useApi.useEffect...')
    try {
      api.fetchNetwork().then((v) => setState({ ...state, ...v }))
    } catch (e) {
      console.log(e)
    }
  }, [])

  return state
}
