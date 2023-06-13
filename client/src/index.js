import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./contexts/visibility-context";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <VisibilityProvider>
      <App />
    </VisibilityProvider>
  </React.StrictMode>
);
