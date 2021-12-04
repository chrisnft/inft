import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  INFT__factory,
  INFT,
} from "../typechain";

const TOKEN_NAME = "INFT";
const TOKEN_SYMBOL = "iNFT";
var TokenFactory: INFT__factory;
var inftToken: INFT;
var OWNER: SignerWithAddress;
var ADDR1: SignerWithAddress;
var ADDR2: SignerWithAddress;
var ADDR3: SignerWithAddress;

// lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

// Token contract test suite
describe("Token contract", function () {
  // re-deploy contract before each test
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    TokenFactory =
      await ethers.getContractFactory(TOKEN_NAME);
    // ASSIGN
    [OWNER, ADDR1, ADDR2, ADDR3] =
      await ethers.getSigners();
    // Deploy contract and wait for its transaction to be minded
    inftToken = await TokenFactory.deploy();
  });

  describe("Deployment", function () {
    // Symbol shoul equal
    it("symbol should equal ", async function () {
      // Assert token owner address is equal to the signers owner address
      // @ts-expect-error
      inftToken.connect();
      expect(await inftToken.symbol()).to.equal(
        OWNER.address
      );
    });
  });
});
