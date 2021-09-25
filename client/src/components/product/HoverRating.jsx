import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import { RatingContext } from "../../contexts/RatingContext";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const useStyles = makeStyles({
  root: {
    width: 150,
    display: "flex",
    alignItems: "center",
  },
});

export default function HoverRating(props) {
  const classes = useStyles();

  const {
    ratingState: { allRatings },
  } = React.useContext(RatingContext);

  const valueRating =
    allRatings.reduce((sum, { rating }) => sum + rating, 0) /
      allRatings.length || 0;

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
