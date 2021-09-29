import React from "react";
import { RatingContext } from "../../contexts/RatingContext";
import { AuthContext } from "../../contexts/AuthContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import HoverRating from "./HoverRating";

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
    width: "100%",
    alignItems: "center",
  },
  paperWidthSm: {
    maxWidth: "unset",
    width: "50%",
  },
});

const DialogAddRating = (props) => {};

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

  const [userRating, setUserRating] = React.useState({});

  const {
    ratingState: { isComment, allRatings },
    getAllRating,
  } = React.useContext(RatingContext);

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) getAllRating(_id, isAuthenticated);
    else getAllRating(_id);
  }, []);

  const handleClose = () => setOpen(false);

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
          <div style={{ display: "flex" }}>
            <HoverRating _id={_id} valueRating={valueRating} />
            {isAuthenticated && (
              <button className="rating-dialog-btn">
                {!isComment ? "Add Rating" : "Edit Rating"}
              </button>
            )}
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {isComment && <h6>Your Comment</h6>}
          {allRatings.map((ratingUser, indexRating) => (
            <div key={indexRating} className={classes.root}>
              <AccountCircleIcon />
              <b style={{ paddingLeft: 5 }}>
                {ratingUser.user.username.split("@")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {ratingUser.createAt}
              </b>
              <br />
              <Rating
                name="hover-feedback"
                value={ratingUser.rating}
                precision={1}
                readOnly
              />
              <p>{ratingUser.content}</p>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
