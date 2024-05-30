import React from "react";
import { createContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";

export const ProductContext = createContext({
  products: [],
});

const ProductProvider = ({ children }) => {
  const [{ data }, startFetching] = useFetch(`${process.env.REACT_APP_API}/get-all-products`);

  const productContextValue = {
    products: data?.products || [],
  };

  useEffect(() => {
    startFetching();
  }, [startFetching]);

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
