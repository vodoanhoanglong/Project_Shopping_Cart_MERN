import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    width: 150,
    display: "flex",
    alignItems: "center",
  },
});

export default function HoverRating(props) {
  const classes = useStyles();

  const { valueRating } = props;

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={parseFloat(valueRating.toFixed(1))}
        precision={0.1}
        readOnly={true}
      />

      <div style={{ marginLeft: 10, fontWeight: "bold" }}>
        {valueRating.toFixed(1)}
      </div>
    </div>
  );
}
