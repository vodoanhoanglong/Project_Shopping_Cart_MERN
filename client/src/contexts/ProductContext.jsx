import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/productReducer";

import axios from "axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    product: null,
    products: [],
    productsLoading: true,
  });

  const get12Products = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product_action");
      if (response.data.success)
        dispatch({
          type: "PRODUCT_LOADED_12ITEM_SUCCESS",
          payload: response.data.products,
        });
    } catch (error) {
      dispatch({ type: "PRODUCT_LOADED_12ITEM_FAIL" });
    }
  };

  const productContextData = {
    productState,
    get12Products,
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
