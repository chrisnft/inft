/**
 * Original Author: Crash
 * Created:   12-4-2021
 *
 * Experimental client side API for NFT's.
 *
 * (c), 2021, Crash.
 **/
import { ethers } from "ethers";
// import { NFTStorage as NFTStorageMin } from 'nft.storage/dist/bundle.esm.min.js'
// import { NFTStorage } from "nft.storage";
import {
  // TransactionResponse,
  BlockWithTransactions,
} from "@ethersproject/abstract-provider/lib.esm/index";
// @ts-expect-error
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
// import { NFTStorage } from 'nft.storage' // Only works with webpack V5

import dotenv from "dotenv";
dotenv.config();

/**
 * The user's NFT metadata request.
 */
export type NFTMetadataRequest = {
  name: string;
  description: string;
  file: File | Blob;
};

/**
 * The options for the API.
 */
export interface ClientAPIOptions {
  network?: string;

  ipfs?: {
    host: string;
    port: number;
    protocol: string;
    headers: {
      Authorization: string;
    };
  };

  provider?: {
    etherscan: string | undefined;
    infura: string | undefined;
  };

  nftStorage?: string | undefined;

  devKey?: string;
}

export interface ClientContract {
  abi: ethers.ContractInterface;
  network?: string;
  address: string;
}

export interface Clients {
  ipfs: NFTStorage;
  provider: ethers.providers.BaseProvider;
  contract: ClientContract;
  opts: ClientAPIOptions;
}
/**
 * {@link createClientAPI}
 */
export interface ClientAPI {
  addNFTMetadataToIPFS: (
    data: NFTMetadataRequest
  ) => Promise<{
    tokenURI: string;
    name: string;
    description: string;
    image: URL;
  }>;

  getOptions: () => ClientAPIOptions | undefined;

  createUserAccount: (
    key?: string | undefined
  ) => Promise<
    | {
        wallet: ethers.Wallet;
        contract: ethers.Contract;
        balance: string;
      }
    | undefined
  >;

  /**
   * TODO: Change to fetch network and state
   * TODO: Better to just return block and network and let hooks organize data?
   */
  fetchNetwork: () => FetchNetworkResponse;

  fetchTransaction: (hash: string) => Promise<{
    transaction: ethers.providers.TransactionResponse;
    receipt: ethers.providers.TransactionReceipt;
  }>;

  fetchBlock: (
    blockHashOrBlockTag: ethers.providers.BlockTag
  ) => Promise<{
    block: ethers.providers.Block;
    blockTrans: BlockWithTransactions;
  }>;

  timeout: (sec: number) => Promise<unknown>;

  getProvider: () => ethers.providers.BaseProvider;

  getIPFS: () => NFTStorage;

  getContract: () => ClientContract;

  mint: (
    data: any,
    contract: ethers.Contract,
    userAddress: string
  ) => Promise<{
    metadata: {
      tokenURI: string;
      name: string;
      description: string;
      image: URL;
    };
    mintResult: any;
  }>;
}

/**
 * Creates a client side API for handling requests and responses to networks.
 *
 * @returns The client side API.
 */
export function createClientAPI(
  contractAddress: string,
  abi: ethers.ContractInterface,
  options?: ClientAPIOptions
): ClientAPI {
  const ethFormat: typeof ethers.utils.formatEther =
    ethers.utils.formatEther;
  const debug = console.log;
  const _options = options;
  const clients = createClients(
    contractAddress,
    abi,
    options
  );

  const getOptions = () => {
    return _options;
  };

  /**
   * Creates the user's wallet connected to the INFT contract.
   *
   * @param key User's private key
   * @returns User's wallet
   */
  const createUserAccount = async (
    key?: string
  ) => {
    const wallet = _createUserWallet(
      options?.devKey || key
    ); // TODO: Key's value should be base on modes 'dev', 'test', ...
    const contract = _createUserContract(wallet);
    const wballance = await wallet.getBalance();
    const balance = ethFormat(wballance);
    if (wallet && contract)
      return { wallet, contract, balance };
  };

  const _createUserWallet = (key?: string) => {
    let wallet;
    if (key) {
      wallet = new ethers.Wallet(key);
    } else {
      wallet = ethers.Wallet.createRandom();
    }
    return wallet.connect(clients.provider);
  };

  const _createUserContract = (
    signer: ethers.Signer
  ) => {
    const { address, abi } = clients.contract;
    return new ethers.Contract(
      address,
      abi,
      signer
    );
  };

  /**
   * Mints a new token for user.
   *
   * @param data Token metadata
   * @param contract The contract with mint method (INFT)
   * @param userAddress The user's account address
   * @returns Result of mint
   */
  const mint = async (
    data: any,
    contract: ethers.Contract,
    userAddress: string
  ) => {
    const meta = await addNFTMetadataToIPFS(data);
    const tokenURI = meta.tokenURI;
    const result = await contract.mint(
      userAddress,
      tokenURI
    );
    return { metadata: meta, mintResult: result };
  };

  /**
   * Adds the metadata to IPFS
   * @param id IPFS id
   * @param key IPFS key
   * @param data The client's data to add
   * @returns
   */
  const addNFTMetadataToIPFS = async (
    data: NFTMetadataRequest
  ) => {
    const TOKEN_URI_BASE_URL =
      "https://ipfs.io/ipfs/";

    const file = data.file as File;

    const req = {
      name: data.name,
      description: data.description,
      image: file,
    };

    const result = await clients.ipfs.store(req);

    const FRIENDLY_TOKEN_URI =
      TOKEN_URI_BASE_URL +
      result.ipnft +
      "/metadata.json"; // Don't use 'ipfs://' because of browsers

    const nftMetaView = {
      ...result.data,
      tokenURI: FRIENDLY_TOKEN_URI,
    };

    return nftMetaView;
  };

  /**
   * Fetches information from the network.
   * @returns Network information
   */
  const fetchNetwork = async () => {
    const provider = clients.provider;
    await timeout(1);
    debug("Fetching...");
    const eprice = await provider.getEtherPrice();
    const bn = await provider.getBlockNumber();
    const network = await provider.getNetwork();
    const bt =
      await provider.getBlockWithTransactions(bn);
    const result = {
      etherPrice: eprice,
      blockNumber: bn,
      network,
      blockWithTransactions: bt,
    };
    return result;
  };

  /**
   * Fetches the transaction from the hash
   * @param hash Hash or number to the block
   * @returns The transactin and receipt
   */
  const fetchTransaction = async (
    hash: string
  ) => {
    const provider = clients.provider;
    const transaction =
      await provider.getTransaction(hash);
    const receipt =
      await provider.getTransactionReceipt(hash);
    return {
      transaction,
      receipt,
    };
  };

  /**
   * Fetches block from network.
   * @param prov Provider
   * @param blockHashOrBlockTag The block number or hashtag
   * @returns Block data
   */
  const fetchBlock = async (
    blockHashOrBlockTag: ethers.providers.BlockTag
  ) => {
    const provider = clients.provider;
    const blockNum =
      await provider.getBlockNumber(); // Current block #
    const block = await provider.getBlock(
      blockHashOrBlockTag || blockNum
    );
    const blockTrans =
      await provider.getBlockWithTransactions(
        blockHashOrBlockTag || blockNum
      );
    return { block, blockTrans };
  };

  /**
   * Creates a timeout in seconds.
   *
   * @param sec Seconds for timeout
   * @returns The timeout promise
   */
  const timeout = (sec: number) =>
    new Promise((r) => setTimeout(r, sec * 1000));

  /**
   * Returns the connected default provider.
   *
   * @returns The default provider
   */
  const getProvider = () => {
    return clients.provider;
  };

  /**
   * Returns the connected ipfs client.
   *
   * @returns The IPFS client
   */
  const getIPFS = () => {
    return clients.ipfs;
  };

  /**
   * Returns the connected smart contract.
   *
   * @returns The smart contract
   */
  const getContract = () => {
    return clients.contract;
  };

  const api = {
    addNFTMetadataToIPFS,
    getOptions,
    createUserAccount,
    fetchNetwork,
    fetchTransaction,
    fetchBlock,
    getProvider,
    getIPFS,
    getContract,
    mint,
    timeout,
  };

  return api;
}

/**
 * Creates the clients for IPFS and ethereum providers.
 *
 * @param cliOpts API Client options
 * @returns
 */
function createClients(
  contractAddress: string,
  abi: ethers.ContractInterface,
  options: Partial<ClientAPIOptions> = {}
): Clients {
  // Init defaults
  const IPFS_ID =
    process.env.REACT_APP_INFURA_IPFS_ID;
  const IPFS_KEY =
    process.env.REACT_APP_INFURA_IPFS_KEY;
  const ETHERSCAN_KEY =
    process.env.REACT_APP_ETHERSCAN_KEY;
  const INFURA_ID =
    process.env.REACT_APP_INFURA_ID;
  const INFURA_KEY =
    process.env.REACT_APP_INFURA_KEY;
  const NFT_STRORAGE_KEY =
    process.env.REACT_APP_NFT_STORAGE_KEY;

  const defaultProviders = {
    etherscan: ETHERSCAN_KEY,
    infura: INFURA_ID,
  };
  const auth =
    "Authorization: Basic " +
    btoa(`${IPFS_ID}:${IPFS_KEY}`);
  const defaultIpfsOptions = {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      Authorization: auth,
    },
  };
  const defaultClientOpts = {
    network: "ropsten",
    ipfs: defaultIpfsOptions,
    nftStorage: NFT_STRORAGE_KEY,
    provider: defaultProviders,
  };

  const defaultOpts = {
    ...defaultClientOpts,
    contractAddress: contractAddress,
    abi: abi,
  };

  // Copy and merge default options and argument options
  const opts = Object.assign(
    defaultOpts,
    options
  );

  const nftStorageClient: NFTStorage =
    new NFTStorage({
      token: opts.nftStorage || "",
    });

  const provider =
    ethers.providers.getDefaultProvider(
      opts.network,
      opts.provider
    );

  return {
    ipfs: nftStorageClient, // TODO: nftStorageClient || HTTPIPFSClient
    provider,
    contract: {
      abi: opts.abi,
      network: opts.network,
      address: opts.contractAddress,
    },
    opts,
  };
}

export type FetchNetworkResponse = Promise<{
  etherPrice: number;
  blockNumber: number;
  network: ethers.providers.Network;
  blockWithTransactions: BlockWithTransactions;
}>;
