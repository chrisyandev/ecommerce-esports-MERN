import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./contexts/visibility-context";
import { ProductsProvider } from "./contexts/products-context";
import { FilterProvider } from "./contexts/filter-context";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <VisibilityProvider>
      <ProductsProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ProductsProvider>
    </VisibilityProvider>
  </React.StrictMode>
);
