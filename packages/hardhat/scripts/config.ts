import { ethers, config } from "hardhat";
import json from "../artifacts/contracts/INFT.sol/INFT.json";
import fs from "fs-extra";

async function main() {
  console.log(config);
  console.log(config.defaultNetwork);
  console.log(process.env.HARDHAT_NETWORK);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
