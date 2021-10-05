export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_REVENUE_SUCCESS":
      return {
        ...state,
        revenue: payload,
      };
    case "SET_REVENUE_FAIL":
      return {
        ...state,
        revenue: null,
      };

    default:
      return state;
  }
};
