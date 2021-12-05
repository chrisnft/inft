/**
 * Original Author: Crash
 * Created:   12-4-2021
 *
 * Experimental hoooks for logic and state of a Ethereum blockchain.
 *
 * (c), 2021, Crash.
 **/
import { ethers } from "ethers";
import React, {
  useState,
  useEffect,
} from "react";
import type { API } from "../types";

// TODO: V2 - Seperate hooks from API (Hooks own module)
const debug = console.log;

// TODO: V2 Seperate state and use generics for hooks
// ReturnType
export type EventHandleSubmit =
  React.FormEventHandler<HTMLFormElement>;
export type EventHandleChange =
  React.ChangeEventHandler<HTMLInputElement>;
export type HookState = {
  loading: boolean;
  error: unknown | Error | unknown;
};
export type NFTMetadata = {
  name: string;
  description: string;
  file: File | string | Blob;
};
export type FormState = NFTMetadata &
  HookState & { prevImgURL: string };
type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;
export type NetworkState = Unwrap<
  API["fetchNetwork"]
> | null;

export type AccountState = Unwrap<
  API["createUserAccount"]
>;

export type MintResult = Unwrap<
  API["mint"]
> | null;

/**
 * Hooks for handling state and business logic.
 */
export interface Hooks {
  useMintOutput: <T>(mintData: T) => {
    ref: React.RefObject<HTMLAnchorElement>;
    handleOutputSave: () => void;
  };

  useMint: (
    contract?: ethers.Contract | undefined,
    userAddress?: string | undefined
  ) => {
    handleChange: EventHandleChange;
    handleFile: EventHandleChange;
    handleSubmit: EventHandleSubmit;
    formVals: FormState;
    nftMeta: MintResult;
  };

  useAccount: (key?: string | undefined) =>
    | {
        wallet: ethers.Wallet;
        contract: ethers.Contract;
        balance: string;
      }
    | undefined;

  useNetwork: () => NetworkState;

  useTab: <T>(data: T) => T | undefined;
}

/**
 * Creates hooks for business managing logic and state of an Ethereum blockchain.
 *
 * @param A client's API
 * @returns Hooks
 */
export function createHooks(
  clientAPI: API
): Hooks {
  const api = clientAPI;

  /**
   * Saves the result from a mint as a JSON file for user.
   *
   * @param mintData The result from a mint
   * @returns
   */
  function useMintOutput<T>(mintData: T) {
    const ref =
      React.useRef<HTMLAnchorElement>(null);

    const outputToFile = (
      data: any,
      element?: React.RefObject<HTMLAnchorElement>
    ) => {
      if (element && element.current) {
        // console.log(data)
        const output = JSON.stringify(
          data,
          null,
          2
        );
        const file = new Blob([output], {
          type: "text/plain",
        });
        const current = element.current;
        current.href = URL.createObjectURL(file);
        current.download = "mint-result.json";
        current.click();
      }
    };

    const handleOutputSave = () => {
      outputToFile(mintData, ref);
    };

    useEffect(() => {
      debug(
        "Effect UseMintOutput standing by..."
      );
      if (mintData) {
        debug("Effect UseMintOutput fire...");
        outputToFile(mintData, ref);
        return () => {
          // Cleanup
        };
      }
    }, [mintData]);

    return { ref, handleOutputSave };
  }

  /**
   * Hook to manage minting.
   *
   * @param contract The Ethereum contract
   * @param userAddress The user's wallet address
   * @returns
   */
  function useMint(
    contract?: ethers.Contract,
    userAddress?: string
  ) {
    const [nftMeta, setNftMeta] =
      useState<MintResult>(null);

    const initVals: FormState = {
      name: "",
      description: "",
      file: "",
      prevImgURL: "",
      loading: false,
      error: "",
    };

    const [vals, setVals] =
      useState<FormState>(initVals);

    const handleFile: EventHandleChange = (e) => {
      const files = e.target.files as FileList;
      const prevImgURL = URL.createObjectURL(
        files[0]
      );
      setVals({
        ...vals,
        prevImgURL,
        file: files[0],
      });
    };

    const handleChange: EventHandleChange = (
      e
    ) => {
      setVals({
        ...vals,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit: EventHandleSubmit =
      async (e) => {
        e.preventDefault();
        debug("Minting....");
        if (contract && userAddress) {
          setVals({ ...vals, loading: true });
          // await api.timeout(2)
          try {
            const result = await api.mint(
              vals,
              contract,
              userAddress
            );
            setNftMeta({ ...result });
          } catch (e) {
            console.log(e);
            setVals({
              ...vals,
              loading: false,
              error: String(e),
            });
          }
        }
        // Update state
        setVals({ ...vals, loading: false });
      };

    return {
      handleChange,
      handleFile,
      handleSubmit,
      formVals: vals,
      nftMeta,
    };
  }

  /**
   * Hook handles state for the user's account.
   */
  function useAccount(key?: string) {
    const [state, setState] =
      useState<AccountState>(undefined);

    React.useEffect(() => {
      try {
        api.createUserAccount(key).then((v) => {
          if (v) {
            setState({ ...state, ...v });
          }
        });
      } catch (e) {
        debug(e);
      }
    }, []);
    return state;
  }

  /**
   * Hook handles state for the Ethereum network.
   * @returns
   */
  function useNetwork() {
    const [state, setState] =
      useState<NetworkState>(null);
    React.useEffect(() => {
      debug("useApi.useEffect...");
      try {
        api
          .fetchNetwork()
          .then((v) =>
            setState({ ...state, ...v })
          );
      } catch (e) {
        console.log(e);
      }
    }, []);

    return state;
  }

  function useTab<T>(data: T) {
    const [state, setState] = React.useState<T>();
    setState(data);
    return state;
  }

  return {
    useMintOutput,
    useMint,
    useAccount,
    useNetwork,
    useTab,
  };
}
