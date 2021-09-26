export const ratingReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RATING_LOADED_SUCCESS":
      return {
        ...state,
        rating: payload,
      };
    case "RATING_LOADED_FAIL":
      return {
        ...state,
        rating: [],
      };
    case "RATING_LOADED_ALL_SUCCESS":
      return {
        ...state,
        allRatings: payload,
      };
    case "RATING_LOADED_ALL_FAIL":
      return {
        ...state,
        allRatings: [],
      };

    case "COMMENT_LOADED_SUCCESS":
      return {
        ...state,
        comment: payload,
      };
    case "COMMENT_LOADED_FAIL":
      return {
        ...state,
        comment: [],
      };
    case "COMMENT_LOADED_ALL_SUCCESS":
      return {
        ...state,
        allComments: payload,
      };
    case "COMMENT_LOADED_ALL_FAIL":
      return {
        ...state,
        allComments: [],
      };
    default:
      return state;
  }
};
