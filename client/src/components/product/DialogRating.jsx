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
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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

const useStylesInput = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "97%",
    },
  },
  paperWidthSm: {
    maxWidth: "unset",
    width: "30%",
  },
}));

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const DialogInputRating = (props) => {
  const { open, setOpen, _id, comment, rating, ...other } = props;
  const classes = useStylesInput();

  const [valueRating, setValueRating] = React.useState(0);
  const [valueComment, setValueComment] = React.useState("");
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    setValueRating(rating);
    setValueComment(comment);
  }, [rating, comment]);

  const handleChangeRating = (e, value) => setValueRating(value);

  const handleChangeComment = (e) => setValueComment(e.target.value);

  const handleClose = () => setOpen(false);

  const submitRating = async (e) => {
    e.preventDefault();

    const value = {
      rating: valueRating,
      content: valueComment,
    };

    try {
      if (other.isComment) await other.updateRating(_id, value);
      else await other.addRating(_id, value);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paperWidthSm: classes.paperWidthSm }}
    >
      <DialogTitle>Your Rating</DialogTitle>
      <form className={classes.root} onSubmit={submitRating} autoComplete="off">
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Rating
            name="customized-empty"
            value={valueRating}
            onChange={handleChangeRating}
            size="large"
            precision={1}
            onChangeActive={(event, newHover) => setHover(newHover)}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
          {valueRating !== null && (
            <Box ml={2}>{labels[hover !== -1 ? hover : valueRating]}</Box>
          )}
        </Box>
        <TextField
          id="filled-basic"
          label="Write a comment"
          value={valueComment}
          variant="filled"
          onChange={handleChangeComment}
        />
        <button disabled={valueRating && valueComment ? false : true}>
          Finished
        </button>
      </form>
    </Dialog>
  );
};

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

  const [openRatingUser, setOpenRatingUser] = React.useState(false);

  const {
    ratingState: { isComment, allRatings },
    getAllRating,
    addRating,
    updateRating,
  } = React.useContext(RatingContext);

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) getAllRating(_id, isAuthenticated);
    else getAllRating(_id);
  }, [openRatingUser]);

  console.log(openRatingUser);

  const handleClick = () => setOpenRatingUser(true);

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
              <button className="rating-dialog-btn" onClick={handleClick}>
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
      <DialogInputRating
        open={openRatingUser}
        setOpen={setOpenRatingUser}
        _id={_id}
        rating={isComment ? allRatings[0].rating : 0}
        comment={isComment ? allRatings[0].content : ""}
        isComment={isComment}
        addRating={addRating}
        updateRating={updateRating}
      />
    </div>
  );
}
