import React from "react";

import { Link } from "react-router-dom";

import NavbarMenu from "../components/layout/NavbarMenu";
import CartStepper from "../components/cart/CartStepper";
import CartTable from "../components/cart/CartTable";
import CartOrder from "../components/cart/CartOrder";
import CartPayment from "../components/cart/CartPayment";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

import { CartContext } from "../contexts/CartContext";

import "../css/Cart.css";

const Cart = () => {
  const { activeStep, setActiveStep } = React.useContext(CartContext);

  const handleClick = () => {
    setActiveStep(0);
    localStorage.removeItem("countCart");
    localStorage.removeItem("cart");
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {activeStep > 2 ? null : <NavbarMenu />}
      <div className="container-cart">
        <CartStepper />
        {activeStep === 0 ? (
          <CartTable />
        ) : activeStep === 1 ? (
          <CartOrder />
        ) : activeStep === 2 ? (
          <CartPayment />
        ) : (
          <div className="animate-completed">
            <div className="swirl-in-fwd">
              <CheckCircleOutlineRoundedIcon
                style={{ color: "green", height: 320, width: 360 }}
              />
            </div>
            <h1 className="animate__animated animate__fadeIn">
              COMPLETED BILL
            </h1>
            <div className="container-button">
              <Link to="/" onClick={handleClick}>
                Go to Home page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
