import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./app.css";

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export * as api from "./api";
export * as hooks from "./hooks";
export * as components from "./components";
export * as types from "./types";
