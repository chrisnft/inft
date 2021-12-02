import type * as view from "./components";
import * as React from "react";
import * as ipfsClient from "ipfs-http-client";
import { ethers } from "ethers";

const debug = console.log;

type AppState = {
  init: boolean;
  networkName: string;
  options?: any;
  provider: ethers.providers.BaseProvider;
  network: {
    etherPrice: number;
    blockNumber: number;
    network: ethers.providers.Network;
    blockWithTransactions: any;
  };
};

export const useApp = (
  networkName = "ropsten",
  options?: any
) => {
  const initState = {
    init: true,
    networkName,
    options,
  } as AppState;
  const [state, setState] =
    React.useState(initState);

  const init = async () => {
    debug("Starting init...");
    try {
      if (state.init) {
        await timeout(4);
        debug("Getting provider...");
        const provider = getProvider(
          networkName,
          options
        );
        debug("Fetching network...");
        await timeout(4);
        const resnetwork = await fetchNetwork(
          provider
        );
        await timeout(4);
        debug("Setting state...");
        setState({
          ...state,
          network: resnetwork,
          provider,
          init: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (state.init) {
      init();
    }
  }, []);

  return state;
};

export interface IHooks {
  useForm: typeof useForm;
  addNFTMetaToIPFS: typeof addNFTMetaToIPFS;
}

export const useForm = (
  ipfsId?: string,
  ipfsKey?: string
) => {
  const initialVals: view.FormVals = {
    name: "",
    description: "",
    file: "",
    loading: false,
    error: "",
  };
  const [vals, setVals] =
    React.useState(initialVals);

  const nftMetaViewInitialVals: view.INFTMeta = {
    name: "",
    description: "",
    image: "",
    tokenURI: "",
  };
  const [nftMeta, setNftMeta] = React.useState(
    nftMetaViewInitialVals
  );

  const handleDrop: view.HandleDrop = (e) => {
    const files = e.target.files as FileList;
    setVals({
      ...vals,
      file: files[0],
    });
  };

  const handleChange: view.HandleChange = (e) => {
    setVals({
      ...vals,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: view.HandleSubmit = async (
    e
  ) => {
    e.preventDefault();
    if (!ipfsId || !ipfsKey) {
      setVals({
        ...vals,
        error: "IPFS environment vars not set.",
      });
      return;
    }
    setVals({ ...vals, loading: true });

    const result = await addNFTMetaToIPFS(
      ipfsId,
      ipfsKey,
      vals
    );
    setNftMeta(result);
    setVals({ ...vals, loading: false });
  };

  return {
    handleChange,
    handleDrop,
    handleSubmit,
    formVals: vals,
    nftMeta,
  };
};

export const addNFTMetaToIPFS = async (
  id: string,
  key: string,
  data: view.FormVals
) => {
  const auth: string =
    "Authorization: Basic " +
    btoa(`${id}:${key}`);
  const TOKEN_URI_BASE_URL =
    "https://ipfs.io/ipfs/";

  const opts: ipfsClient.Options = {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      Authorization: auth,
    },
  };
  const client = ipfsClient.create(opts);
  const file = data.file as File;

  const resFile = await client.add(file); // Add image
  await timeout(2);

  const req = {
    name: data.name,
    description: data.description,
    image: TOKEN_URI_BASE_URL + resFile.path,
  };
  const resMeta = await client.add(
    JSON.stringify(req)
  ); // NFT METADATA

  console.log(resMeta);

  const nftMetaView = {
    name: req.name,
    description: req.description,
    image: req.image,
    tokenURI: TOKEN_URI_BASE_URL + resMeta.path,
  };

  return nftMetaView;
};

const providers = ethers.providers;

export const getProvider = (
  network: string,
  options: any
) => {
  debug(network);
  return providers.getDefaultProvider(
    network,
    options
  );
};

const fetchNetwork = async (
  provider: ethers.providers.BaseProvider
) => {
  debug("Fetching...");
  await timeout(1);
  const eprice = await provider.getEtherPrice();
  await timeout(1);
  const bn = await provider.getBlockNumber();
  await timeout(1);
  const network = await provider.getNetwork();
  await timeout(1);
  const bt =
    await provider.getBlockWithTransactions(bn);
  const result = {
    etherPrice: eprice,
    blockNumber: bn,
    network,
    blockWithTransactions: "",
  };
  return result;
};

const timeout = (sec: number) =>
  new Promise((r) => setTimeout(r, sec * 1000));
