import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/productReducer";

import axios from "axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    products: [],
    productFavorites: [],
    allProducts: [],
  });
  const [cart, setCart] = useState(0);
  const [openedPopover, setOpenedPopover] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

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

  const get12ProductsFavorites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/product_action/most_favorites"
      );
      if (response.data.success)
        dispatch({
          type: "PRODUCT_LOADED_12FAVORITES_SUCCESS",
          payload: response.data.mostFavoriteProducts,
        });
    } catch (error) {
      dispatch({ type: "PRODUCT_LOADED_12FAVORITES_FAIL" });
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
    get12ProductsFavorites,
    getAllProducts,
    cart,
    setCart,
    openedPopover,
    setOpenedPopover,
    quantity,
    setQuantity,
    openDialog,
    setOpenDialog,
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
