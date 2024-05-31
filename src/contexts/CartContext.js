import { createContext, useState, useEffect, useCallback } from "react";

const INCREASE = "increase";

//create Context and give it a default values to better autocomplition whe we use it.
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removefromCart: () => {},
  clearCart: () => {},
  quantityHandler: () => {},
  itemAmount: 0,
  total: 0,
});

//check if there is cart in localStorage, if not then set cart as []
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);

  const totalItemsAmountInCart = cart.reduce((acc, item) => acc + item.amount, 0);
  const totalPriceInCart = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

  //save any changes in the cart to the localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const itemAlreadyExistsInCart = cart.find(item => item.id === id);

    let newCart;
    if (itemAlreadyExistsInCart) {
      //increase the amount if product already exists in the cart.
      newCart = [...cart].map(item => (item.id === id ? { ...item, amount: item.amount + 1 } : item));
      setCart(newCart);
    } else {
      //add a product if it doesn't exist yet in the cart
      newCart = [...cart, newItem];
      setCart(newCart);
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

  const clearCart = useCallback(() => {
    return setCart([]);
  }, []);

  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    quantityHandler,
    itemAmount: totalItemsAmountInCart,
    total: totalPriceInCart,
  };

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
