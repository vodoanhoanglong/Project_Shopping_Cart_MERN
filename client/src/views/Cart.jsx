import React from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import CartStepper from "../components/cart/CartStepper";
import CartTable from "../components/cart/CartTable";
import CartOrder from "../components/cart/CartOrder";
import CartPayment from "../components/cart/CartPayment";

import { CartContext } from "../contexts/CartContext";

import "../css/Cart.css";

const Cart = () => {
  const { activeStep } = React.useContext(CartContext);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <div className="container-cart">
        <CartStepper />
        {activeStep === 0 ? (
          <CartTable />
        ) : activeStep === 1 ? (
          <CartOrder />
        ) : activeStep === 2 ? (
          <CartPayment />
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
