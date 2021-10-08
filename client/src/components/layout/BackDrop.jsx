import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function BackDrop(props) {
  const { open } = props;

  return (
    <div>
      <Backdrop
        style={{ color: "#333", fontWeight: "bold", zIndex: 1500 }}
        open={open}
        transitionDuration={2000}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
