import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import CheckIcon from "@material-ui/icons/Check";

import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ShowToast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={props.showToast}
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
