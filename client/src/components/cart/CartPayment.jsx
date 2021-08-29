import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";

import "../../css/CartPayment.css";

const CartPayment = () => {
  return (
    <div className="container-cart-form animate__animated animate__fadeIn">
      <form className="form-information-user">
        <h4>Delivery address</h4>
        <div className="input-cart">
          <TextField
            id="filled-basic-name"
            label="Full name"
            fullWidth
            margin="dense"
            inputProps={{
              maxLength: 40,
              minLength: 2,
              pattern: "\\D*",
            }}
            required
          />
          <DoneIcon className="icon-input-complete" />
        </div>
        <div className="input-cart">
          <TextField
            id="filled-basic-phone"
            label="Phone number"
            fullWidth
            margin="dense"
            inputProps={{
              maxLength: 12,
              minLength: 10,
              pattern: "[0][0-9]{9,11}",
            }}
            required
          />
        </div>
        <div className="input-cart">
          <TextField
            id="filled-basic-address"
            label="Address"
            fullWidth
            margin="dense"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CartPayment;
