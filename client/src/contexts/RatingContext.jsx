import { createContext, useReducer } from "react";
import { ratingReducer } from "../reducers/ratingReducer";
import { apiUrl } from "./constants";

import axios from "axios";

export const RatingContext = createContext();

const RatingContextProvider = ({ children }) => {
  const [ratingState, dispatch] = useReducer(ratingReducer, {
    rating: [],
    allRatings: [],
    comment: [],
    allComments: [],
  });

  const getCommentUser = async (productId, userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/comment/${productId}`,
        userId
      );
      if (response.data.success) return response.data.commentList.content;
      // dispatch({
      //   type: "COMMENT_LOADED_SUCCESS",
      //   payload: response.data.commentList,
      // });
    } catch (error) {
      dispatch({ type: "COMMENT_LOADED_FAIL" });
    }
  };

  const getAllComment = async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/comment/all_comment/${productId}`
      );
      if (response.data.success)
        dispatch({
          type: "COMMENT_LOADED_ALL_SUCCESS",
          payload: response.data.commentAllList,
        });
    } catch (error) {
      dispatch({ type: "COMMENT_LOADED_ALL_FAIL" });
    }
  };

  const getRatingUser = async (productId) => {
    try {
      const response = await axios.get(`${apiUrl}/rating/${productId}`);
      if (response.data.success)
        dispatch({
          type: "RATING_LOADED_SUCCESS",
          payload: response.data.ratingList,
        });
    } catch (error) {
      dispatch({ type: "RATING_LOADED_FAIL" });
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
    getCommentUser,
    getAllComment,
  };

  return (
    <RatingContext.Provider value={ratingContextData}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContextProvider;
