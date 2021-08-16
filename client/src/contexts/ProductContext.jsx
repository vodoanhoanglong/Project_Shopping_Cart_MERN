import { createContext, useReducer, useState, useRef } from "react";
import { productReducer } from "../reducers/productReducer";

import axios from "axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    product: null,
    products: [],
    allProducts: [],
  });
  const [cart, setCart] = useState(0);
  const [openedPopover, setOpenedPopover] = useState(false);

  const popoverAnchor = useRef(null);

  const get12Products = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product_action");
      if (response.data.success)
        dispatch({
          type: "PRODUCT_LOADED_12ITEM_SUCCESS",
          payload: response.data.type.products,
        });
    } catch (error) {
      dispatch({ type: "PRODUCT_LOADED_12ITEM_FAIL" });
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product_action");
      if (response.data.success)
        dispatch({
          type: "PRODUCT_LOADED_ALL_SUCCESS",
          payload: response.data.type.allProducts,
        });
    } catch (error) {
      dispatch({ type: "PRODUCT_LOADED_ALL_FAIL" });
    }
  };

  const productContextData = {
    productState,
    get12Products,
    getAllProducts,
    cart,
    setCart,
    openedPopover,
    setOpenedPopover,
    popoverAnchor,
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
