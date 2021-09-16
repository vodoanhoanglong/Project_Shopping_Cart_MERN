import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import CheckIcon from "@material-ui/icons/Check";

import { CartContext } from "../../contexts/CartContext";

import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ShowToast = (props) => {
  const { showToastCart } = React.useContext(CartContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={showToastCart}
      TransitionComponent={SlideTransition}
      message={
        <div className="toast-cart">
          <CheckIcon
            style={{ color: "green", paddingRight: 2 }}
            fontSize="medium"
          />
          {props.title}
        </div>
      }
    />
  );
};

export default ShowToast;
