import { useContext, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  //transform all items in an appropriat format to be send to the server
  const checkOutItems = cart.map(item => ({
    id: item.id,
    quantity: item.amount,
  }));

  async function checkoutHandler() {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: checkOutItems,
        }),
      });

      // server should send us back url to the stripe payment page
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      //navigate to the stripe payment page if successful
      window.location = responseData.url;
    } catch (error) {
      setIsLoading(false);
      console.error(error || "Something went wrong");
    }
  }

  return (
    <div
      className={`${isLoading ? "pointer-events-none" : ""} ${
        isOpen ? "right-0" : "-right-full"
      } flex flex-col w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping bag ({itemAmount})</div>
        <div className="cursor-pointer w-8 h-8 flex justify-center items-center" onClick={handleClose}>
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      {cart.length > 0 && (
        <div className="flex flex-col gap-y-2 flex-1 lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
          {cart.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          <button
            className="cursor-pointer flex items-center justify-center bg-red-500 hover:bg-red-400 text-white w-12 h-12 text-xl transition disabled:pointer-events-none disabled:bg-gray-400"
            disabled={cart.length < 1}
            onClick={clearCart}
          >
            <FiTrash2 />
          </button>
        </div>

        {/* <Link to="/" className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium">
          View cart
        </Link> */}
        <button
          onClick={checkoutHandler}
          disabled={cart.length < 1 || isLoading}
          className="bg-[#353535] hover:bg-primary flex p-4 justify-center items-center text-white w-full font-medium transition disabled:pointer-events-none disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
