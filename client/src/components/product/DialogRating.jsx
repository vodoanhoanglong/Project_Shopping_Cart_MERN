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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import Button from "@material-ui/core/Button";

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
      createAt: new Date(Date.now()).toLocaleString(),
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
      <DialogTitle onClose={handleClose}>Your Rating</DialogTitle>
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
        <div style={{ textAlign: "center" }}>
          <Button
            id="btn-rating"
            type="submit"
            disabled={valueRating && valueComment ? false : true}
          >
            Finished
          </Button>
        </div>
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const {
    ratingState: { isComment, allRatings },
    getAllRating,
    addRating,
    updateRating,
    deleteRating,
  } = React.useContext(RatingContext);

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) getAllRating(_id, isAuthenticated);
    else getAllRating(_id);
  }, [openRatingUser, anchorEl]);

  const handleDeleteRating = async () => {
    try {
      await deleteRating(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => setOpenRatingUser(true);

  const handleClose = () => setOpen(false);

  let body = allRatings.map((ratingUser, indexRating) => (
    <div key={indexRating} className={classes.root}>
      <AccountCircleIcon />
      <b style={{ paddingLeft: 5 }}>
        {ratingUser.user.username.split("@")[0]}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {ratingUser.createAt}
      </b>
      <br />
      <Rating
        style={{ marginTop: 5 }}
        name="hover-feedback"
        value={ratingUser.rating}
        precision={1}
        readOnly
      />
      <p style={{ paddingLeft: 5 }}>{ratingUser.content}</p>
    </div>
  ));

  if (isComment)
    body = (
      <>
        <div className={classes.root}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon />
            <b style={{ paddingLeft: 5 }}>
              {allRatings[0].user.username.split("@")[0]}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {allRatings[0].createAt}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="rating-user">Your Rating</span>
            </b>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClickMenu}
              className="rating-icon-btn"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>
                <div onClick={handleClick}>Edit</div>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <div onClick={handleDeleteRating}>Delete</div>
              </MenuItem>
            </Menu>
          </div>
          <Rating
            style={{ marginTop: 5 }}
            name="hover-feedback"
            value={allRatings[0].rating}
            precision={1}
            readOnly
          />
          <p style={{ paddingLeft: 5 }}>{allRatings[0].content}</p>
        </div>
        {allRatings.slice(1).map((ratingUser, indexRating) => (
          <div key={indexRating} className={classes.root}>
            <AccountCircleIcon />
            <b style={{ paddingLeft: 5 }}>
              {ratingUser.user.username.split("@")[0]}
            </b>
            {ratingUser.createAt}
            <br />
            <Rating
              style={{ marginTop: 5 }}
              name="hover-feedback"
              value={ratingUser.rating}
              precision={1}
              readOnly
            />
            <p style={{ paddingLeft: 5 }}>{ratingUser.content}</p>
          </div>
        ))}
      </>
    );

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
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {allRatings.length === 0 ? (
            <div className="empty-rating">
              <CommentIcon fontSize="large" />
              <p>There are no ratings</p>
            </div>
          ) : (
            body
          )}
        </DialogContent>
        {!isComment && (
          <div className="container-rating-btn">
            <button className="rating-dialog-btn" onClick={handleClick}>
              Add Rating
            </button>
          </div>
        )}
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
