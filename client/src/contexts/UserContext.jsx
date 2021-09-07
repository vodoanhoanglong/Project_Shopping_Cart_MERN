import { createContext, useState, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [choice, setChoice] = useState(null);

  // Context data
  const userContextData = {
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
