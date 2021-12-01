import { ethers } from "hardhat";
import json from "../deployment.json";
import wallet from "../wallet.json";

const ROPSTEN_URL = process.env.ROPSTEN_URL || "";
const WALLET = process.env.PRIVATE_KEY || "";
const format = ethers.utils.formatEther;

async function main() {
  const provider =
    new ethers.providers.JsonRpcProvider(
      ROPSTEN_URL
    );

  const _provider: { [key: string]: any } = {};

  // Providers are read only
  _provider.balance = format(
    await provider.getBalance(wallet.address)
  );
  _provider.etherPrice = _provider.gasPrice =
    format(await provider.getGasPrice());
  _provider.network = await provider.getNetwork();
  _provider.blockNum =
    await provider.getBlockNumber();
  _provider.block = await provider.getBlock(
    _provider.block
  );

  console.log(_provider);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
