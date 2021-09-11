export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDER_LOADED_SUCCESS":
      return {
        ...state,
        order: payload,
      };
    case "ORDER_LOADED_FAIL":
      return {
        ...state,
        order: [],
      };
    default:
      return state;
  }
};
