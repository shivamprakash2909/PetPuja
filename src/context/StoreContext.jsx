import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
export const StoreContext = createContext();
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const backendUrl = import.meta.env.VITE_BASE_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const res = await axiosInstance.get("/api/food/food-list");
      if (res.status === 200 || res.status === 201) {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list: ", error);
      setFoodList([]);
    }
  };
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    console.log(token);
    if (token) {
      await axiosInstance.post("/api/cart/add", { productId: itemId, quantity: 1 }, { headers: { token: token } });
    }
  };
  const removeFromCart = async (itemId) => {
    try {
      await axiosInstance.post("/api/cart/remove", { itemId }, { headers: { token } });

      // On success, update local state
      setCartItems((prev) => {
        const currentQty = prev[itemId] || 0;
        if (currentQty <= 1) {
          // Remove item completely
          const { [itemId]: _, ...rest } = prev;
          return rest;
        } else {
          // Decrement quantity
          return { ...prev, [itemId]: currentQty - 1 };
        }
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getAllCartItem = async (token) => {
    try {
      const res = await axiosInstance.get("/api/cart/get", {
        headers: { token },
      });
      const formattedCart = {};
      res.data.forEach((item) => {
        formattedCart[item.product._id] = item.quantity;
      });
      setCartItems(formattedCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
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
  useEffect(() => {
    fetchFoodList();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setCartItems({});
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllCartItem(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getAllCartItem,
    totalCartValue,
    deliveryFees,
    backendUrl,
    token,
    setToken,
  };
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};
export { StoreContextProvider };
