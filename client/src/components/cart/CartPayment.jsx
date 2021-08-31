import React, { useContext } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import "../../css/CartPayment.css";
import { CartContext } from "../../contexts/CartContext";

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

  const { itemCart, date } = useContext(CartContext);
  const fullName = document.getElementById("filled-basic-name").value;
  const phone = document.getElementById("filled-basic-phone").value;
  const address = document.getElementById("filled-basic-address").value;
  const coupon =
    document.getElementById("filled-basic-coup") !== null
      ? document.getElementById("filled-basic-coup").value
      : false;
  const creditCard =
    document.getElementById("filled-basic-card-number") !== null
      ? document.getElementById("filled-basic-card-number").value
      : false;
  let totalBill = itemCart.reduce((sum, { totalPrice }) => sum + totalPrice, 0);
  if (coupon !== null) totalBill = totalBill - (totalBill * 10) / 100;

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  return (
    <div
      className="animate__animated animate__fadeIn"
      style={{ height: "70vh", backgroundColor: "#F7F8FA" }}
    >
      <div className="container-card-bill-information">
        <Card className={classes.root}>
          <CardContent>
            <h2>Bill Information</h2>
            <div className="card-bill-information">
              <p>
                <b>Full name:</b> {fullName}
              </p>
              <p>
                <b>Phone number:</b> {phone}
              </p>
              <p>
                <b>Address:</b> {address}
              </p>
              {creditCard && (
                <p>
                  <b>Credit card number:</b> {creditCard}
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
              <h5>
                <b>Total:</b> ${totalBill.toFixed(2)}
              </h5>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default CartPayment;
