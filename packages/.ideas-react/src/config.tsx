import json from "./deployment.json"; // The contract deployment properties
import { ContractInterface } from "ethers";
import { Options } from "ipfs-http-client";
import dotenv from "dotenv";
dotenv.config();

class LocalhostNetworkConfig {
  name: string = json.network.name;
  url: string = "http://127.0.0.1:8545/";
  chainId: string =
    json.network.chainId.toString();
}

class InfuraNetworkConfig {
  name: string = json.network.name;
  url: string = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
  chainId: string =
    json.network.chainId.toString();
}

class NFTConfig {
  address: string = json.address;
  abi: ContractInterface = json.abi;
}

const _createIPFSOpts = (): Options => {
  const ENV = {
    IPFS_ID: process.env.IPFS_ID,
    IPFS_KEY: process.env.IPFS_KEY,
  };

  const auth: string =
    "Authorization: Basic " +
    btoa(`${ENV.IPFS_ID}:${ENV.IPFS_KEY}`);

  const opts: Options = {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      Authorization: auth,
    },
  };
  return opts;
};

class LocalhostWalletOpts {
  mnemonic: string =
    "test test test test test test test test test test test junk"; // LOCALHOST ONLY!!!
  derivePath: string = "m/44'/60'/0'/0/0"; // LOCALHOST ONLY!!!
}

export class LocalhostConfig {
  walletOpts: LocalhostWalletOpts =
    new LocalhostWalletOpts();
  ipfsOpts: Options = _createIPFSOpts();
  network: LocalhostNetworkConfig =
    new LocalhostNetworkConfig();
  NFT: NFTConfig = new NFTConfig();
}

export class InfuraConfig {
  network: InfuraNetworkConfig =
    new InfuraNetworkConfig();
  NFT: NFTConfig = new NFTConfig();
  ipfsOpts: Options = _createIPFSOpts();
}
