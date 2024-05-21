import React from "react";

const Product = ({ product }) => {
  return <div className="w-full h-[300px] bg-pink-200">{product.title}</div>;
};

export default Product;
