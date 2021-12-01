import { ethers } from "hardhat";
import json from "../deployment.json";
import wallet from "../wallet.json";

const ROPSTEN_URL = process.env.ROPSTEN_URL || "";

async function main() {
  console.log(ROPSTEN_URL);

  const provider =
    new ethers.providers.JsonRpcProvider(
      ROPSTEN_URL
    );
  console.log(provider);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
