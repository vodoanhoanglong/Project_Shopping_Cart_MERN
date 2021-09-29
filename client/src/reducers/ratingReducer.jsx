export const ratingReducer = (state, action) => {
  const {
    type,
    payload: { isComment, allRatings },
  } = action;
  switch (type) {
    case "RATING_LOADED_ALL":
      return {
        ...state,
        isComment,
        allRatings,
      };

    default:
      return state;
  }
};
