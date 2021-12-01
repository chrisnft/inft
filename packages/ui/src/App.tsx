import * as React from "react";
import * as store from "./store";

function App() {
  const { state, setState } = store.useStore();

  return (
    <div>
      <div>Hello World</div>
      <div>{JSON.stringify(state)}</div>
      <button
        onClick={() =>
          setState({ ...state, name: "chris" })
        }
      >
        Set name
      </button>
    </div>
  );
}

export default App;
