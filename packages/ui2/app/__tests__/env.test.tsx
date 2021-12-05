import * as dotenv from "dotenv";
dotenv.config();

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_KEY =
  process.env.REACT_APP_INFURA_KEY;
const ETHERSCAN_KEY =
  process.env.REACT_APP_ETHERSCAN_KEY;
const NFT_STORAGE_KEY =
  process.env.REACT_APP_NFT_STORAGE_KEY;

describe("Environment variables", () => {
  test("should not be null", () => {
    expect(INFURA_ID).toBeDefined();
    expect(INFURA_KEY).toBeDefined();
    expect(ETHERSCAN_KEY).toBeDefined();
    expect(NFT_STORAGE_KEY).toBeDefined();
  });
});
