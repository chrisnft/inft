import depJson from "./deployment.json";
import dotenv from "dotenv";
dotenv.config();

const IPFS_ID =
  process.env.REACT_APP_INFURA_IPFS_ID;
const IPFS_KEY =
  process.env.REACT_APP_INFURA_IPFS_KEY;
const ETHERSCAN_KEY =
  process.env.REACT_APP_INFURA_ETHERSCAN_KEY;
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_KEY =
  process.env.REACT_APP_INFURA_KEY;
const INFURA_ROPSTEN_URL = `https://ropsten.infura.io/v3/${INFURA_ID}`;

depJson.network = "ropsten";

const defaultNetOptions = {
  etherscan: ETHERSCAN_KEY,
  infura: INFURA_KEY,
};

export const config = {
  ...depJson,
  IPFS_ID: IPFS_ID,
  IPFS_KEY: IPFS_KEY,
  ETHERSCAN_KEY: ETHERSCAN_KEY,
  INFURA_ID: INFURA_ID,
  INFURA_KEY: INFURA_KEY,
  INFURA_ROPSTEN_URL,
  defaultNetOptions,
};
