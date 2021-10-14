export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://fast-shelf-17416.herokuapp.com";

export const LOCAL_STORAGE_TOKEN_NAME = "shoppingCart";
