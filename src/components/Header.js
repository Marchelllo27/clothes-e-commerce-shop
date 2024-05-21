import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";

const Header = () => {
  const { setIsOpen } = useContext(SidebarContext);
  return (
    <div className="bg-pink-200">
      <div>Header</div>
      <div onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer flex relative">
        <BsBag className="text-2xl" />
      </div>
    </div>
  );
};

export default Header;
