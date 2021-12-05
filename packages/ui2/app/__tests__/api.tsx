import { createClientAPI } from "../src/api/api";
import depJSON from "../src/deployment.json";

const devKey =
  "0x31c356d3f6c570c2a28a79a02cdb3218ff078c64c3224c4a943776c645f762dd";
const contractAddr = depJSON.address;
const contractAbi = depJSON.abi;

const api = createClientAPI(
  contractAddr,
  contractAbi,
  { devKey: devKey }
);

api.fetchNetwork().then((v) => console.log(v));
