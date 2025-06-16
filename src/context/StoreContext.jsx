import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext();
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  //checking cart items
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const totalCartValue = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const deliveryFees = () => {
    let deliveryFee = 0;
    const isCartEmpty = !Object.values(cartItems).some((quantity) => quantity > 0);
    if (isCartEmpty) {
      deliveryFee = 0;
    } else if (totalCartValue() > 200) {
      deliveryFee = 0;
    } else {
      deliveryFee = 50;
    }
    return deliveryFee;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    totalCartValue,
    deliveryFees,
  };
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};
export { StoreContextProvider };
