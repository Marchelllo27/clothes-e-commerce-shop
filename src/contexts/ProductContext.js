import React from "react";
import { createContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";

export const ProductContext = createContext({
  products: [],
  isLoading: false,
  error: null,
});

const ProductProvider = ({ children }) => {
  const [{ data, isLoading, error }, startFetching] = useFetch(`${process.env.REACT_APP_API}/get-all-products`);

  const productContextValue = {
    products: data?.products || [],
    isLoading,
    error,
  };

  useEffect(() => {
    startFetching();
  }, [startFetching]);

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
