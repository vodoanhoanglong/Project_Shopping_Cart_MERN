import { createContext, useReducer } from "react";
import { ratingReducer } from "../reducers/ratingReducer";
import { apiUrl } from "./constants";

import axios from "axios";

export const RatingContext = createContext();

const RatingContextProvider = ({ children }) => {
  const [ratingState, dispatch] = useReducer(ratingReducer, {
    allRatings: [],
  });

  const getAllRating = async (productId, isAuthenticated) => {
    try {
      let response;
      if (!isAuthenticated)
        response = await axios.get(`${apiUrl}/rating/all_rating/${productId}`);
      else response = await axios.get(`${apiUrl}/rating/${productId}`);
      if (response.data.success)
        dispatch({
          type: "RATING_LOADED_ALL",
          payload: {
            isComment: response.data.isComment,
            allRatings: response.data.ratingAllList,
          },
        });
    } catch (error) {
      dispatch({
        type: "RATING_LOADED_ALL",
        payload: { isComment: false, allRatings: [] },
      });
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
