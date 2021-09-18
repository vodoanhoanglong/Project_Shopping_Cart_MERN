export const favoritesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FAVORITES_LOADED_SUCCESS":
      return {
        ...state,
        favorites: payload,
      };
    case "FAVORITES_LOADED_FAIL":
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};
