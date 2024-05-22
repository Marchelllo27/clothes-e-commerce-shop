import { useState, createContext } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  handleClose: () => {},
});

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const sidebarValue = { isOpen, setIsOpen, handleClose };

  return <SidebarContext.Provider value={sidebarValue}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
