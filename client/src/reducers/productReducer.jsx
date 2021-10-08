export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "PRODUCT_LOADED_12FAVORITES_SUCCESS":
      return {
        ...state,
        productFavorites: payload,
      };
    case "PRODUCT_LOADED_12FAVORITES_FAIL":
      return {
        ...state,
        productFavorites: [],
      };
    case "PRODUCT_LOADED_12DISCOUNT_SUCCESS":
      return {
        ...state,
        productDiscount: payload,
      };
    case "PRODUCT_LOADED_12DISCOUNT_FAIL":
      return {
        ...state,
        productDiscount: [],
      };
    case "PRODUCT_LOADED_ALL_SUCCESS":
      return {
        ...state,
        allProducts: payload.allProducts,
        products: payload.products,
      };
    case "PRODUCT_LOADED_ALL_FAIL":
      return {
        ...state,
        allProducts: [],
        products: [],
      };

    default:
      return state;
  }
};
