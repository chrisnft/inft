import * as React from "react";
import * as views from "./components";
import * as hooks from "./hooks";
import { defAppStore } from "./store";
import "./config";

function App() {
  const [store, setStore] =
    React.useState(defAppStore);

  const {
    handleChange,
    handleSubmit,
    formState,
    imgPrevUrl,
  } = hooks.useForm();

  return (
    <div>
      <views.Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />

      <pre>
        <code>{JSON.stringify(formState)}</code>
      </pre>
    </div>
  );
}

export default App;
