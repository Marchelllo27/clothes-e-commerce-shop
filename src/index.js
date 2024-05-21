import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Contexts
import ProductContextProvider from "./contexts/ProductContext";
import SideBarContextProvider from "./contexts/SidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SideBarContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </SideBarContextProvider>
  </React.StrictMode>
);
