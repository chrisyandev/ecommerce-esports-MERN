import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider, ProductsProvider } from "./contexts";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <VisibilityProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </VisibilityProvider>
  </React.StrictMode>
);
