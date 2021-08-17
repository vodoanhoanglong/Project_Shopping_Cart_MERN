import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemCart, setItemCart] = useState([]);
  const [showToastCart, setShowToastCart] = useState(false);

  const cartContextData = {
    itemCart,
    setItemCart,
    showToastCart,
    setShowToastCart,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
