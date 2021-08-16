import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemCart, setItemCart] = useState([]);

  const cartContextData = {
    itemCart,
    setItemCart,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
