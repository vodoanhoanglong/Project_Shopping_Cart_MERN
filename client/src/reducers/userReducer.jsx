export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDER_LOADED_SUCCESS":
      return {
        ...state,
        orderLoading: true,
        order: payload,
      };
    case "ORDER_LOADED_FAIL":
      return {
        ...state,
        orderLoading: false,
        order: [],
      };
    default:
      return state;
  }
};
