import { createContext, useState, useEffect, useRef } from "react";

const INCREASE = "increase";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removefromCart: () => {},
  clearCart: () => {},
  quantityHandler: () => {},
  itemAmount: 0,
  total: 0,
});

const CartContextProvider = ({ children }) => {
  console.count("Cart Context Fired");
  const [cart, setCart] = useState([]);
  // const totalPriceRef = useRef(0);
  // const itemsAmountInCartRef = useRef(0);
  // IT'S UNNECESSARY TO USE STATE AND TRIGGER COMPONENT RE-RENDER
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.count("useEffect fired");
    if (cart) {
      //total price in the cart
      setTotal(cart.reduce((acc, item) => acc + item.price * item.amount, 0));
      //item's amount in the cart
      setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
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
      newCart = [...cart, newItem];
      setCart(newCart);
    }
    // itemsAmountInCartRef.current = newCart.reduce((acc, item) => acc + item.amount, 0);
    // totalPriceRef.current = newCart.reduce((acc, item) => acc + item.price * item.amount, 0);
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
    // itemAmount: itemsAmountInCartRef.current,
    // total: totalPriceRef.current,
    itemAmount,
    total,
  };

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
