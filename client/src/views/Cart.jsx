import React from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import Footer from "../components/layout/Footer";
import CartTable from "../components/cart/CartTable";

import "../css/Cart.css";

const Cart = () => {
  return (
    <>
      <NavbarMenu />
      <div className="container-cart">
        <CartTable />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
