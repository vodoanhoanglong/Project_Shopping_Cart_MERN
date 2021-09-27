export const ratingReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
    default:
      return state;
  }
};
