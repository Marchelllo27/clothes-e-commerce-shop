import React from "react";
import { createContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";

export const ProductContext = createContext({
  products: [],
});

const ProductProvider = ({ children }) => {
  const [{ data }, startFetching] = useFetch("https://fakestoreapi.com/products");

  const productContextValue = {
    products: data,
  };

  useEffect(() => {
    startFetching();
  }, [startFetching]);

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
