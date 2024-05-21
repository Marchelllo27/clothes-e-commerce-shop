import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Contexts
import ProductContextProvider from "./contexts/ProductContext";
import SideBarContextProvider from "./contexts/SidebarContext";
import CartContextProvider from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <SideBarContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </SideBarContextProvider>
    </CartContextProvider>
  </React.StrictMode>
);
