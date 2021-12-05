import * as React from "react";
import * as hooks from "./hooks";

function App() {
  const { state, setState } = hooks.useForm();

  return (
    <>
      <div>Hello World</div>
      <button
        type="button"
        onClick={() => setState(state + 1)}
      >
        {state}
      </button>

      <button
        type="button"
        onClick={() => setState(state)}
      >
        Use effect wont run becaue we didnt change
        state {state}
      </button>
    </>
  );
}

export default App;
