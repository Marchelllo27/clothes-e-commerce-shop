import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { image, title, id, price, amount } = item;
  return (
    <div className="flex">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
      </div>
    </div>
  );
};

export default CartItem;
