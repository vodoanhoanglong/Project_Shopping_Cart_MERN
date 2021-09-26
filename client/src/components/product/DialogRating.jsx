import React from "react";
import { RatingContext } from "../../contexts/RatingContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import HoverRating from "./HoverRating";
import Comment from "./Comment";

import "../../css/DialogRating.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  root: {
    width: 200,
    alignItems: "center",
  },
  paperWidthSm: {
    maxWidth: "unset",
    width: "50%",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function DialogRating(props) {
  const classes = useStyles();

  const { title, _id, valueRating } = props;
  const { open, setOpen } = props;

  const {
    ratingState: { allRatings },
    getAllRating,
  } = React.useContext(RatingContext);

  React.useEffect(() => getAllRating(_id), []);

  const handleClose = () => setOpen(false);

  console.log();
  return (
    <div className="rating-dialog">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paperWidthSm: classes.paperWidthSm }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <p style={{ textAlign: "center" }}>All Rating</p>
          <p style={{ paddingLeft: 2 }}>{title}</p>
          <HoverRating _id={_id} valueRating={valueRating} />
        </DialogTitle>
        <DialogContent dividers>
          {allRatings.map((userRating, indexRating) => (
            <div key={indexRating} className={classes.root}>
              <AccountCircleIcon />
              <b style={{ paddingLeft: 5 }}>
                {userRating.user.username.split("@")[0]}
              </b>
              <Rating
                name="hover-feedback"
                value={userRating.rating}
                precision={1}
                readOnly
              />
              {/* <Comment idProduct={_id} idUser={userRating.user._id} /> */}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
