import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Contexts
import ProductContextProvider from "./contexts/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </React.StrictMode>
);
