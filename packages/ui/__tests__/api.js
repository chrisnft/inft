"use strict";
exports.__esModule = true;
var api_1 = require("../api/api");
var deployment_json_1 = require("../deployment.json");
var devKey = "0x31c356d3f6c570c2a28a79a02cdb3218ff078c64c3224c4a943776c645f762dd";
var contractAddr = deployment_json_1["default"].address;
var contractAbi = deployment_json_1["default"].abi;
var api = api_1.createClientAPI(contractAddr, contractAbi, { devKey: devKey });
api.fetchNetwork().then(function (v) { return console.log(v); });
