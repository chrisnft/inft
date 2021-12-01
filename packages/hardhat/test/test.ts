import { ethers } from "hardhat";

async function main() {
  const contract =
    await ethers.getContractFactory("INFT");

  const inft = await contract.deploy();

  inft.mint(
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "test"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
