import { ethers } from "hardhat";
import json from "../deployment.json";
import wallet from "../wallet.json";

const ROPSTEN_URL = process.env.ROPSTEN_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const format = ethers.utils.formatEther;

async function main() {
  const provider =
    new ethers.providers.JsonRpcProvider(
      ROPSTEN_URL
    );

  const signer = new ethers.Wallet(
    PRIVATE_KEY,
    provider
  );

  const _signer: { [key: string]: any } = {};

  _signer.address = signer.address;
  _signer.balance = format(
    await signer.getBalance()
  );

  console.log(_signer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
