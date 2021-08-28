import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "../../css/CartPayment.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const CartPayment = () => {
  const classes = useStyles();

  return (
    <div className="container-cart-form animate__animated animate__fadeIn">
      <form className={classes.root} noValidate autoComplete="off">
        <h4>Delivery address</h4>
        {/* <div className="input-cart"> */}
        <TextField id="filled-basic-name" label="Full name" fullWidth />
        {/* </div> */}

        {/* <div className="input-cart"> */}
        <TextField id="filled-basic-phone" label="Phone number" />
        {/* </div> */}

        {/* <div className="input-cart"> */}
        <TextField id="filled-basic-address" label="Street address" />
        {/* </div> */}
      </form>
    </div>
  );
};

export default CartPayment;
