import React, { useContext } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import CartSlider from "./CartSlider";

import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";

import "react-multi-carousel/lib/styles.css";
import "../../css/CartPayment.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CartPayment = () => {
  const classes = useStyles();

  const { itemCart, value, date, handleNext, handleBack, cartUser } =
    useContext(CartContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const creditCard = value.cardNumber !== "" ? true : false;

  let totalBill = itemCart.reduce((sum, { totalPrice }) => sum + totalPrice, 0);
  if (value.couponCode !== "") totalBill = totalBill - (totalBill * 10) / 100;

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const handleClick = async () => {
    const userInformation = {
      fullName: value.fullName,
      phone: value.phone,
      address: value.address,
      cardNumber: creditCard && value.cardNumber,
      expiration: creditCard && `${date.month}/${date.year}`,
    };

    const cartInformation = {
      user: user._id,
      userInformation,
      cart: itemCart,
      discount: value.couponCode ? 10 : 0,
      totalPrice: totalBill.toFixed(2),
    };

    const cartUserData = await cartUser(cartInformation);
    if (!cartUserData.success) return;
    localStorage.removeItem("countCart");
    localStorage.removeItem("cart");
    handleNext();
  };

  return (
    <div
      className="animate__animated animate__fadeIn"
      style={{ height: "100vh", backgroundColor: "#F7F8FA" }}
    >
      <div className="container-card-bill-information">
        <Card className={classes.root} style={{ width: "40%" }}>
          <CardContent>
            <h1>Bill Information</h1>
            <div className="card-bill-information">
              <p>
                <b>Full name:</b> {value.fullName}
              </p>
              <p>
                <b>Phone number:</b> {value.phone}
              </p>
              <p>
                <b>Address:</b> {value.address}
              </p>
              {creditCard && (
                <p>
                  <b>Credit card number:</b> {value.cardNumber}
                </p>
              )}
              {creditCard && (
                <p>
                  <b>Expiration date of Credit card:</b> {date.month}/
                  {date.year}
                </p>
              )}
              <p>
                <b>Payment day:</b> {today}
              </p>
              <h2>
                <b style={{ marginRight: 30 }}>
                  Total: ${totalBill.toFixed(2)}
                </b>
                {value.couponCode !== "" ? (
                  <span className="payment-discount">10% OFF</span>
                ) : null}
              </h2>
            </div>
          </CardContent>
          <CardActions>
            <div className="container-button-payment-finished">
              <button onClick={handleBack}>Back</button>
              <button onClick={handleClick}>Complete</button>
            </div>
          </CardActions>
        </Card>
      </div>
      <CartSlider />
    </div>
  );
};

export default CartPayment;
