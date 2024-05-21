import React from "react";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext({
  products: [],
});

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const productContextValue = {
    products: products,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
