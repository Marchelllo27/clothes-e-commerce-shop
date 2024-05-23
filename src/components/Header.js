import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";

import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import Logo from "../img/logo.svg";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    function handleScroll() {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"} fixed w-full z-10 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div>
            <img className="w-[40px]" src={Logo} alt="black hanger for clothes" />
          </div>
        </Link>
        <div onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer flex relative">
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 w-[18px] h-[18px] flex items-center justify-center text-white rounded-full text-[12px]">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
