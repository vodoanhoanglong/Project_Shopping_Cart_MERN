export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "PRODUCT_LOADED_12ITEM_SUCCESS":
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };
    case "PRODUCT_LOADED_12ITEM_FAIL":
      return {
        ...state,
        products: [],
        productsLoading: false,
      };
    case "PRODUCT_LOADED_ALL_SUCCESS":
      return {
        ...state,
        allProducts: payload,
        productsLoading: false,
      };
    case "PRODUCT_LOADED_ALL_FAIL":
      return {
        ...state,
        allProducts: [],
        productsLoading: false,
      };

    default:
      return state;
  }
};
