import { useContext } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping bag (0)</div>
        <div className="cursor-pointer w-8 h-8 flex justify-center items-center" onClick={handleClose}>
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      {cart.length > 0 && (
        <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
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
          <div
            className="cursor-pointer flex items-center justify-center bg-red-500 text-white w-12 h-12 text-xl"
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
