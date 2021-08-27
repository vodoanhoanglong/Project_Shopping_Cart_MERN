import React from "react";

import Footer from "../components/layout/Footer";
import CartTable from "../components/cart/CartTable";

import "../css/Cart.css";
import NavbarMenu from "../components/layout/NavbarMenu";
import CartStepper from "../components/cart/CartStepper";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { itemCart } = React.useContext(CartContext);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <div
        className="container-cart"
        style={!itemCart.length ? { height: "100vh" } : null}
      >
        <CartStepper />
        <CartTable />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
