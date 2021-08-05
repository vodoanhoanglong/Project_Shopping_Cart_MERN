export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "PRODUCT_LOADED_12ITEM_SUCCESS":
      return {
        ...state,
        products: payload,
      };
    case "PRODUCT_LOADED_12ITEM_FAIL":
      return {
        ...state,
        products: [],
      };
    case "PRODUCT_LOADED_ALL_SUCCESS":
      return {
        ...state,
        allProducts: payload,
      };
    case "PRODUCT_LOADED_ALL_FAIL":
      return {
        ...state,
        allProducts: [],
      };

    default:
      return state;
  }
};
