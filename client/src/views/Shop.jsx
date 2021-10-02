import React from "react";
import Footer from "../components/layout/Footer";

import NavbarMenu from "../components/layout/NavbarMenu";
import ShowToast from "../components/layout/ShowToast";
import ProductModal from "../components/product/ProductModal";
import ShowProduct from "../components/product/ShowProduct";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

import "../css/Shop.css";

const Shop = () => {
  const [urlImg, setUrlImg] = React.useState("");

  const { showToastCart } = React.useContext(CartContext);
  const { toastLogoutUser } = React.useContext(UserContext);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <ShowProduct setUrlImg={setUrlImg} />
      <ProductModal _id={urlImg._id} product={urlImg} />
      <ShowToast title="Added to cart" showToast={showToastCart} />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <Footer />
    </div>
  );
};

export default Shop;
