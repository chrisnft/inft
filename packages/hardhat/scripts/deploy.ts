import { ethers } from "hardhat";
import json from "../artifacts/contracts/INFT.sol/INFT.json";
import fs from "fs-extra";
import path from "path";

async function main() {
  const CONTRACT_NAME = "INFT";
  const HARDHAT_NETWORK =
    process.env.HARDHAT_NETWORK;

  console.log(
    `\n📟  Deploying ${CONTRACT_NAME} on network  🌎  '${HARDHAT_NETWORK}'...`
  );

  const contract =
    await ethers.getContractFactory(
      CONTRACT_NAME
    );
  const inft = await contract.deploy();
  const deployed = await inft.deployed();

  let depInfo: { [key: string]: any } = {};
  depInfo.address = deployed.address;
  depInfo.network = process.env.HARDHAT_NETWORK;
  depInfo.name = await inft.name();
  depInfo.symbol = await inft.symbol();
  depInfo.abi = json.abi;

  // fs.writeJSONSync(`deployment.json`, depInfo, {
  //   spaces: 2,
  // });

  // Creates directory if does not exist

  const SRC = path.normalize(
    "deployments/deployment.json"
  );
  fs.outputJSONSync(SRC, depInfo, {
    spaces: 2,
  });

  console.log(
    `\n🤘  Finished deployment and saved deployment information to  📁  ${SRC}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
