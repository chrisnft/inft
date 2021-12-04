import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  INFT__factory,
  INFT,
} from "../typechain";

const TOKEN_NAME = "INFT";
const TOKEN_SYMBOL = "iNFT";
let TokenFactory: INFT__factory;
let inftToken: INFT;
let OWNER: SignerWithAddress;
let TO: SignerWithAddress;
let FROM: SignerWithAddress;
let OTHER: SignerWithAddress;

// lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

// Token contract test suite
describe("Token contract", function () {
  // re-deploy contract before each test
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    TokenFactory =
      await ethers.getContractFactory(TOKEN_NAME);
    // ASSIGN
    [OWNER, TO, FROM, OTHER] =
      await ethers.getSigners();
    // Deploy contract and wait for its transaction to be minded
    inftToken = await TokenFactory.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // Assert token owner address is equal to the signers owner address
      // @ts-expect-error
      expect(await inftToken.owner()).to.equal(
        OWNER.address
      );
    });
  });
});
