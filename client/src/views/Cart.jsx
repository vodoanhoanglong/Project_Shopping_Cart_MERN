import React from "react";

import CartTable from "../components/cart/CartTable";

import "../css/Cart.css";
import NavbarMenu from "../components/layout/NavbarMenu";
import CartStepper from "../components/cart/CartStepper";
import { CartContext } from "../contexts/CartContext";
import CartPayment from "../components/cart/CartPayment";

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
          <CartPayment />
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
