import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const CartPayment = () => {
  const classes = useStyles();

  return (
    <div className="animate__animated animate__fadeIn">
      <form
        className={classes.root}
        style={{ backgroundColor: "#FFFF" }}
        noValidate
        autoComplete="off"
      >
        <TextField id="filled-basic" label="Full name" variant="filled" />
        <TextField id="filled-basic" label="Phone number" variant="filled" />
        <TextField id="filled-basic" label="Address" variant="filled" />
      </form>
    </div>
  );
};

export default CartPayment;
