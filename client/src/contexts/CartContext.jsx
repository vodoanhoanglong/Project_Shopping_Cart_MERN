import { createContext, useState, useReducer } from "react";
import { apiUrl } from "./constants";
import { cartReducer } from "../reducers/cartReducer";

import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    revenue: null,
  });

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

  const cartUser = async (item) => {
    try {
      const response = await axios.post(`${apiUrl}/cart`, item);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getRevenue = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cart`);
      if (response.data.success)
        dispatch({
          type: "SET_REVENUE_SUCCESS",
          payload: response.data.allOrder,
        });
    } catch (error) {
      dispatch({
        type: "SET_REVENUE_FAIL",
      });
    }
  };

  const addContact = async (info) => {
    try {
      await axios.post(`${apiUrl}/contact`, info);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
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
    cartUser,
    cartState,
    getRevenue,
    addContact,
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
