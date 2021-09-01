import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [itemCart, setItemCart] = useState([]);
  const [showToastCart, setShowToastCart] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState({
    fullName: "",
    phone: "",
    address: "",
    radio: "",
    cardNumber: "",
    couponCode: "",
  });
  const [date, setDate] = useState({
    month: "",
    year: "",
  });
  const [length, setLength] = useState({
    fullName: 0,
    phone: 0,
    address: 0,
  });
  const [icon, setIcon] = useState({
    fullName: false,
    phone: false,
    address: false,
  });
  const [disabled, setDisabled] = useState(true);

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
    date,
    setDate,
    value,
    setValue,
    length,
    setLength,
    icon,
    setIcon,
    disabled,
    setDisabled,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
