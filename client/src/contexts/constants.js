export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://yil-shopping.vercel.app/";

export const LOCAL_STORAGE_TOKEN_NAME = "shoppingCart";
