import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemCart, setItemCart] = useState([]);
  const [showToastCart, setShowToastCart] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const cartContextData = {
    itemCart,
    setItemCart,
    showToastCart,
    setShowToastCart,
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
