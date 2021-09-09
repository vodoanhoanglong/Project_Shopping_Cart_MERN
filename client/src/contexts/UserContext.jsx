import { createContext, useState, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [orderState, dispatch] = useReducer(userReducer, {
    orderLoading: false,
    order: [],
  });

  const [choice, setChoice] = useState(null);

  const saveInformationUser = async (userForm) => {
    try {
      const response = await axios.put(`${apiUrl}/user`, userForm);
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getOrder = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/user/${userId}`);
      if (response.data.success)
        dispatch({
          type: "ORDER_LOADED_SUCCESS",
          payload: response.data.order,
        });
    } catch (error) {
      dispatch({ type: "ORDER_LOADED_FAIL" });
    }
  };

  // Context data
  const userContextData = {
    orderState,
    saveInformationUser,
    getOrder,
    choice,
    setChoice,
  };

  // Return provider
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
