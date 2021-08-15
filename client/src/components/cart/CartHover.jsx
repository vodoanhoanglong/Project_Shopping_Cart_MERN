import React, { useContext } from "react";

import { ProductContext } from "../../contexts/ProductContext";

import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const CartHover = () => {
  const { showCart, setShowCart } = useContext(ProductContext);

  const classes = useStyles();

  const open = Boolean(showCart);
  return (
    <div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={showCart}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setShowCart(null)}
        disableRestoreFocus
      >
        <Typography>I use Popover.</Typography>
      </Popover>
    </div>
  );
};

export default CartHover;
