import { createContext, useState, useReducer, useEffect } from "react";
import { favoritesReducer } from "../reducers/favoritesReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const FavoritesContext = createContext();

const FavoritesContextProvider = ({ children }) => {
  const [favoritesState, dispatch] = useReducer(favoritesReducer, {
    favorites: [],
  });

  const [newFavorites, setNewFavorites] = useState(0);

  const addFavorites = async (productId) => {
    try {
      await axios.post(`${apiUrl}/favorites/${productId}`);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getFavorites = async () => {
    try {
      const response = await axios.get(`${apiUrl}/favorites`);
      if (response.data.success)
        dispatch({
          type: "FAVORITES_LOADED_SUCCESS",
          payload: response.data.favorites,
        });
    } catch (error) {
      dispatch({ type: "FAVORITES_LOADED_FAIL" });
    }
  };

  const checkFavoritesProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/favorites/find_favorite/${productId}`
      );
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const deleteFavorites = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/favorites/${productId}`);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Context data
  const favoritesContextData = {
    favoritesState,
    addFavorites,
    getFavorites,
    deleteFavorites,
    newFavorites,
    setNewFavorites,
    checkFavoritesProduct,
  };

  // Return provider
  return (
    <FavoritesContext.Provider value={favoritesContextData}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
