import { ethers } from "hardhat";
import json from "../artifacts/contracts/INFT.sol/INFT.json";
import fs from "fs-extra";
import path from "path";

async function main() {
  const SRC = path.normalize(
    "deployments/deployment.json"
  );
  const TO = path.normalize(
    "../ui/src/deployment.json"
  );

  const isSrcExists = fs.statSync(SRC);

  if (!isSrcExists) {
    console.log(
      "ā  " +
        SRC +
        " does not exist! Can't export!"
    );
    return;
  }

  fs.copyFileSync(SRC, TO);

  console.log(
    `\nā  Finished export of deployment file  š  ${SRC} to  š  ${TO}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
