import React from "react";

import Footer from "../components/layout/Footer";
import CartTable from "../components/cart/CartTable";

import "../css/Cart.css";
import NavbarMenu from "../components/layout/NavbarMenu";
import CartStepper from "../components/cart/CartStepper";

const Cart = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <div className="container-cart">
        <CartStepper />
        <CartTable />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
