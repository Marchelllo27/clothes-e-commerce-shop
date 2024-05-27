import { useContext } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const dummyItems = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const navigate = useNavigate();

  async function checkoutHandler() {
    try {
      const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: dummyItems,
        }),
      });

      //IF RESPONSE IS NOT OK
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong");
      }
      // server should send us back url
      const url = await response.json();
      console.log(url);
      // navigate(url);
    } catch (error) {
      console.error(error.error || "Something went wrong");
    }
  }

  return (
    <div
      className={`${
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
          className="bg-[#353535] hover:bg-primary flex p-4 justify-center items-center text-white w-full font-medium transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
