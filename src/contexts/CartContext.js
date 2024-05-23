import { createContext, useState, useRef } from "react";

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

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const totalPriceRef = useRef(0);
  const itemsAmountInCartRef = useRef(0);
  // WE CAN AVOID USAGE of useState and useEffect CAUSE IT TRIGGERS UNNECESSARE RE-RENDERING
  // const [itemAmount, setItemAmount] = useState(0);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   if (cart) {
  //     setTotal(cart.reduce((acc, item) => acc + item.price * item.amount, 0));
  //     setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
  //   }
  // }, [cart]);

  //update amount of items and total price in cart
  function adjustValuesInCart(productsInCart) {
    itemsAmountInCartRef.current = productsInCart.reduce((acc, item) => acc + item.amount, 0);
    totalPriceRef.current = productsInCart.reduce((acc, item) => acc + item.price * item.amount, 0);
  }

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
    //update itemsAmount in the Cart and total Price in the cart.
    adjustValuesInCart(newCart);
  };

  const removeFromCart = id => {
    const newCart = [...cart].filter(item => item.id !== id);
    //update itemsAmount in the Cart and total Price in the cart.
    adjustValuesInCart(newCart);
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
    //update itemsAmount in the Cart and total Price in the cart.
    adjustValuesInCart(newCart);
    setCart(newCart);
  };

  const clearCart = () => {
    //update itemsAmount in the Cart and total Price in the cart.
    adjustValuesInCart([]);
    setCart([]);
  };

  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    quantityHandler,
    itemAmount: itemsAmountInCartRef.current,
    total: totalPriceRef.current,
    // itemAmount,
    // total,
  };

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
