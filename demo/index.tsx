import React from "react";
import { createRoot } from "react-dom/client";
import { KeyboardEventBusProvider } from "../src";
import App from "./app";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container); 
  root.render(
    <KeyboardEventBusProvider>
      <App />
    </KeyboardEventBusProvider>
  );
}
