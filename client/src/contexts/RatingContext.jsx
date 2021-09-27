import { createContext, useReducer } from "react";
import { ratingReducer } from "../reducers/ratingReducer";
import { apiUrl } from "./constants";

import axios from "axios";

export const RatingContext = createContext();

const RatingContextProvider = ({ children }) => {
  const [ratingState, dispatch] = useReducer(ratingReducer, {
    userRating: null,
    allRatings: [],
  });

  const getRatingUser = async (productId) => {
    try {
      const response = await axios.get(`${apiUrl}/rating/${productId}`);
      if (response.data.success) return response.data.ratingList;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllRating = async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/rating/all_rating/${productId}`
      );
      if (response.data.success)
        dispatch({
          type: "RATING_LOADED_ALL_SUCCESS",
          payload: response.data.ratingAllList,
        });
    } catch (error) {
      dispatch({ type: "RATING_LOADED_ALL_FAIL" });
    }
  };

  const addRating = async (productId, rating) => {
    try {
      await axios.post(`${apiUrl}/rating/${productId}`, rating);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const updateRating = async (productId, rating) => {
    try {
      await axios.put(`${apiUrl}/rating/${productId}`, rating);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const ratingContextData = {
    ratingState,
    getRatingUser,
    getAllRating,
    addRating,
    updateRating,
  };

  return (
    <RatingContext.Provider value={ratingContextData}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContextProvider;
