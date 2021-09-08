import { createContext, useState } from "react";
import { apiUrl } from "./constants";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
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

  // Context data
  const userContextData = {
    saveInformationUser,
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
