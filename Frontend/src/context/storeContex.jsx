import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setfood_list] = useState([]);
  const [token , settoken ] = useState("")


  const mainFoodlist = async () => {
    const Food_data = await fetch("http://localhost:5000/api/food/list");
    const FoodRe = await Food_data.json();
    setfood_list(FoodRe.data);
  };

  const loadCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.post("http://localhost:5000/api/cart/get", {headers: { token }});
      setCartItems(response.data.cartData)
    } catch (error) {
      console.error("Error loading cart data:", error.data);
    }
  };


  useEffect(() => {
    mainFoodlist();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData();
    }
  }, [token]);



  const addToCart =async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post("http://localhost:5000/api/cart/addToCart",{itemId},{headers:{token}})
    }
  };


  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post("http://localhost:5000/api/cart/removeFromCart",{itemId},{headers:{token}})
    }
  };

  const CheckChatagoery = (category) => {
    const fileter = food_list.filter((item) => item.category === category);
    return fileter;
  };

  const CartTotal = () => {
    let total = 0;
    for (const Item in cartItems) {
      if (cartItems[Item] > 0) {
        let itemInfo = food_list.find((product) => product._id === Item);
        total += itemInfo.price * cartItems[Item];
      }
    }
    return total;
  };

  const ContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    CheckChatagoery,
    CartTotal,
    mainFoodlist,
    settoken,
    loadCartData,
    token
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
