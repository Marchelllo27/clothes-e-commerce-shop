import { createContext, useState } from "react";

const INCREASE = "increase";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removefromCart: () => {},
  clearCart: () => {},
  quantityHandler: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const itemAlreadyExistsInCart = cart.find(item => item.id === id);

    if (itemAlreadyExistsInCart) {
      //increase the amount if product already exists in the cart.
      const newCart = [...cart].map(item => (item.id === id ? { ...item, amount: item.amount + 1 } : item));
      setCart(newCart);
    } else {
      console.log("item added");
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = id => {
    const newCart = [...cart].filter(item => item.id !== id);
    setCart(newCart);
  };

  const quantityHandler = (id, action) => {
    const itemAlreadyExistsInCart = cart.find(item => item.id === id);

    //check if it's addition or subtraction
    const addQuantity = itemAlreadyExistsInCart && action === INCREASE;
    //remove from cart if quantity 1 & we continue to decrease quantity
    if (!addQuantity && itemAlreadyExistsInCart.amount <= 1) return removeFromCart(id);

    //update cart with correct quantity
    const newCart = [...cart].map(item =>
      item.id === id ? { ...item, amount: addQuantity ? item.amount + 1 : item.amount - 1 } : item
    );
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    quantityHandler,
  };

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
