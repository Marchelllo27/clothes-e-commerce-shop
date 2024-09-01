import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product, skeleton }) => {
  const { addToCart } = useContext(CartContext);
  const { id, category, image, title, price } = product;

  // skeleton version while loading products
  if (skeleton) {
    return (
      <article>
        <Skeleton className="border border-[#e4e4e4] h-[300px] mb-4" />
        <div>
          <Skeleton count={3} />
        </div>
      </article>
    );
  }

  const Image = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[200px] mx-auto flex justify-center items-center">
          <img className="max-h-[160px] group-hover:scale-110 transition duration-300" src={image} alt={title} />
        </div>
      </div>
    );
  };

  return (
    <article>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <Image />
        {/* buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category & title & price*/}
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>

        <div className="font-semibold">$ {parseFloat(price).toFixed(2)}</div>
      </div>
    </article>
  );
};

export default Product;
