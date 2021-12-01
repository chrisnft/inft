import * as React from "react";
import * as view from "./components";
import * as hooks from "./handlers";

function App() {
  const hks = hooks.useForm();
  return (
    <div>
      <div>Hello World</div>
      <view.Form
        handleChange={hks.handleChange}
        handleDrop={hks.handleDrop}
        handleSubmit={hks.handleSubmit}
        vals={hks.formVals}
      />
      <div>{JSON.stringify(hks.formVals)}</div>
      {hks.nftMeta && (
        <view.NFTMetaView {...hks.nftMeta} />
      )}
    </div>
  );
}

export default App;
