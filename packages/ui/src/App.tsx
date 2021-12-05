/**
 * Original Author: Crash
 * Created:   12-4-2021
 *
 * Experimental UI for minting a new token from a ethereum NFT contract.
 *
 * (c), 2021, Crash.
 **/
import React from "react";
import * as view from "./components";
import { createHooks } from "./hooks";
import { createClientAPI } from "./api";
import jsonDeployment from "./deployment.json";
import dotenv from "dotenv";

dotenv.config();
const devKey =
  "0x31c356d3f6c570c2a28a79a02cdb3218ff078c64c3224c4a943776c645f762dd"; // DEV KEY FOR PROFESSOR
const api = createClientAPI(
  jsonDeployment.address,
  jsonDeployment.abi,
  { devKey }
);
const hooks = createHooks(api);

/**
 * Main
 *
 * @component
 *
 * @returns App
 *
 */
function App() {
  // const [app,setApp] = useState({ // TODO: App state?
  // })
  const network = hooks.useNetwork();

  const account = hooks.useAccount(devKey);

  const form = hooks.useMint(
    account?.contract,
    account?.wallet.address
  );

  const mintHk = hooks.useMintOutput<
    typeof form["nftMeta"]
  >(form.nftMeta);

  const AppTabProps = [
    {
      tab: "👤 ",
      title: "👤  Account",
      data: {
        address: account?.wallet.address,
        balance: account?.balance,
      },
    },
    {
      tab: "🌎 ",
      title: "🌎  Network",
      data: network,
    },
    {
      tab: "📜 ",
      title: "📜  Contract",
      data: account?.contract,
    },
  ];

  return (
    <view.Main>
      <view.AppTab<typeof AppTabProps>
        sections={AppTabProps}
      />
      <view.MintForm
        handleSubmit={form.handleSubmit}
        handleDrop={form.handleFile}
        handleChange={form.handleChange}
        vals={form.formVals}
      />
      {form.nftMeta?.metadata.tokenURI && (
        <div className="mb-6 font-mono text-blue-400">
          <a
            href={form.nftMeta.metadata.tokenURI}
          >
            🤘 Vist your token's metadata
          </a>
          <div className="text-sm">
            🥲 IPFS is currently slow... Give it a
            couple mintues.
          </div>
        </div>
      )}
      <view.Section
        title={"NFT"}
        data={form.nftMeta}
        handleDownloadOnClick={
          mintHk.handleOutputSave
        }
      />
      <a ref={mintHk.ref} className="hidden" />
    </view.Main>
  );
}

export default App;
