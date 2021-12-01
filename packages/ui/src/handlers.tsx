import * as view from "./components";
import * as React from "react";
import * as ipfsClient from "ipfs-http-client";
import dotenv from "dotenv";
dotenv.config();
const IPFS_ID =
  process.env.REACT_APP_INFURA_IPFS_ID;
const IPFS_KEY =
  process.env.REACT_APP_INFURA_IPFS_KEY;

export const useForm = () => {
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
    if (!IPFS_ID || !IPFS_KEY) {
      setVals({
        ...vals,
        error: "IPFS environment vars not set.",
      });
      return;
    }
    setVals({ ...vals, loading: true });

    const result = await addNFTMetaToIPFS(
      IPFS_ID,
      IPFS_KEY,
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

const timeout = (sec: number) =>
  new Promise((r) => setTimeout(r, sec * 1000));
