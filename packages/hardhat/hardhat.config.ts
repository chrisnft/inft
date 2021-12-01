import * as dotenv from "dotenv";
import fs from "fs-extra";
import {
  HardhatUserConfig,
  task,
} from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { HardhatRuntimeEnvironment } from "hardhat/types";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

const createRandomWallet = async (
  // @ts-ignore
  _,
  { ethers, config }: HardhatRuntimeEnvironment
) => {
  const wallet = ethers.Wallet.createRandom();
  const jsonWallet = {
    mnemonic: wallet.mnemonic,
    address: wallet.address,
    key: wallet.privateKey,
  };
  const file = "wallet.json";
  fs.writeJSONSync(file, jsonWallet, {
    spaces: 2,
  });
  console.log("📁  Wallet saved to wallet.json");
};

task(
  "generate",
  "Generates a new wallet and saves to disk",
  createRandomWallet
);

task(
  "accounts",
  "Prints the list of accounts",
  async (taskArgs, hre) => {
    const accounts =
      await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

export default config;
