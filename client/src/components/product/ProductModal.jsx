import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";
import { RatingContext } from "../../contexts/RatingContext";
import { Dialog, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HoverRating from "./HoverRating";
import DialogRating from "./DialogRating";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BackDrop from "../layout/BackDrop";
import ImageGallery from "react-image-gallery";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import "../../css/ProductModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  paperWidthSm: {
    maxWidth: "unset",
    width: "75%",
  },
});

const ProductModal = (props) => {
  const classes = useStyles();

  const {
    _id,
    color,
    product: { title, description, size, price, url, discount },
  } = props;
  const sizeCurr = props.currSize;

  const [showRating, setShowRating] = useState(false);
  const [defaultSelect, setDefaultSelect] = useState(
    !sizeCurr ? "DEFAULT" : sizeCurr
  );
  const [defaultSelect2, setDefaultSelect2] = useState(
    !color ? "DEFAULT" : color
  );
  const [indexImg, setIndexImg] = React.useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [showAlert, setShowAlert] = useState("show-alert");

  const { itemCart, setItemCart, setShowToastCart } = useContext(CartContext);
  const {
    setCart,
    setOpenedPopover,
    quantity,
    setQuantity,
    openDialog,
    setOpenDialog,
  } = useContext(ProductContext);

  const {
    ratingState: { allRatings },
  } = React.useContext(RatingContext);

  const valueRating =
    allRatings.reduce((sum, { rating }) => sum + rating, 0) /
      allRatings.length || 0;

  const currColor = (hexColor) =>
    defaultSelect2 === hexColor ? "3px solid #000000" : "2px solid #FFFFFF";

  // khi truyền props xuống để làm constructor cho State thì nên dùng useEffect
  useEffect(() => {
    if (sizeCurr !== undefined) {
      setDefaultSelect(sizeCurr);
      setDefaultSelect2(color);
      setIndexImg(findIndex(color));
    } else if (url !== undefined) setDefaultSelect2(url[0].color);
  }, [sizeCurr, color, url]);

  const regex = /^[0-9\b]+$/;

  const findIndex = (string) => url.findIndex((item) => item.color === string);

  const handleChange = (e) => {
    setDefaultSelect(e.target.value);
    if (e.target.value !== "DEFAULT") setShowAlert("show-alert");
  };
  const handleChange2 = (e) => {
    setDefaultSelect2(e.target.value);
    setIndexImg(findIndex(e.target.value));
  };

  const handleIncrease = () =>
    quantity === 99 ? setQuantity(1) : setQuantity(quantity + 1);

  const handleDecrease = () =>
    quantity === typeof String
      ? setQuantity(1)
      : quantity <= 1
      ? setQuantity(1)
      : setQuantity(quantity - 1);

  const handleChangeInput = (e) => {
    let input = e.target.value;
    if (!regex.test(input)) return;
    if (parseInt(input) > 99) {
      setQuantity(1);
      return;
    }
    setQuantity(parseInt(input));
  };

  const handleLeaveInput = () =>
    document.getElementById("quantity-show").value === ""
      ? setQuantity(1)
      : null;

  const handleOnClickInput = () => setQuantity("");

  const images =
    url !== undefined &&
    url[indexImg].img.map((item) => ({
      original: url !== undefined ? item : null,
      thumbnail: url !== undefined ? item : null,
      originalWidth: "550",
      originalHeight: "650",
      thumbnailWidth: "150",
      thumbnailHeight: "100",
    }));

  const updateCountCart = () => setCart((prevCart) => prevCart + quantity);

  const setTimeOutPopover = () => {
    setOpenedPopover(true);
    setShowToastCart(true);
    setTimeout(() => {
      setOpenedPopover(false);
      setShowToastCart(false);
    }, 2500);
  };

  const addItemPopover = () => {
    setItemCart((prevState) => [
      {
        _id,
        url,
        title,
        discount,
        allSize: size,
        imgIndex: findIndex(defaultSelect2),
        priceNoDiscount: price,
        price:
          discount !== 0
            ? (price - (price * discount) / 100).toFixed(2)
            : price,
        description,
        totalItem: quantity,
        size: defaultSelect,
        color: defaultSelect2,
        totalPrice:
          discount !== 0
            ? (price - (price * discount) / 100).toFixed(2) * quantity
            : price * quantity,
      },
      ...prevState,
    ]);
    updateCountCart();
    setTimeOutPopover();
  };

  const updateItemPopover = (currentQuantity) => {
    setItemCart((prevState) => [
      ...prevState.map((item) =>
        item._id === _id &&
        item.size === defaultSelect &&
        item.color === defaultSelect2
          ? {
              ...item,
              totalItem: currentQuantity,
              totalPrice: item.price * currentQuantity,
            }
          : item
      ),
    ]);
    updateCountCart();
    setTimeOutPopover();
  };

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      if (!sizeCurr) {
        setDefaultSelect("DEFAULT");
        setDefaultSelect2(url[0].color);
        setIndexImg(0);
      } else {
        setDefaultSelect(sizeCurr);
        setDefaultSelect2(color);
        setIndexImg(findIndex(color));
      }
      setQuantity(1);

      setShowAlert("show-alert");
    }, 400);
  };

  const handleAddToCart = () => {
    if (defaultSelect === "DEFAULT") setShowAlert("");
    else {
      setOpenBackdrop(true);
      const addItem = itemCart.find(
        (item) =>
          item._id === _id &&
          item.size === defaultSelect &&
          item.color === defaultSelect2
      );
      if (!addItem) addItemPopover();
      else {
        let currentQuantity = addItem.totalItem + quantity;
        updateItemPopover(currentQuantity);
      }
      setTimeout(() => setOpenBackdrop(false), 300);
      handleClose();
    }
  };

  const handleUpdateToCart = () => {
    setOpenBackdrop(true);
    setIndexImg(findIndex(defaultSelect2));
    const resultTotalItem = itemCart.find(
      (itemUpdate) =>
        itemUpdate._id === _id &&
        itemUpdate.size === defaultSelect &&
        itemUpdate.color === defaultSelect2
    );
    if (
      !resultTotalItem ||
      (sizeCurr === defaultSelect && color === defaultSelect2)
    ) {
      setItemCart((prevState) => [
        ...prevState.map((item) =>
          item._id === _id && item.size === sizeCurr && item.color === color
            ? {
                ...item,
                imgIndex: findIndex(defaultSelect2),
                size: defaultSelect,
                color: defaultSelect2,
              }
            : item
        ),
      ]);
    } else {
      const resultSearchItem = itemCart.indexOf(resultTotalItem);
      itemCart.splice(resultSearchItem, 1);
      setItemCart(itemCart);

      setItemCart((prevState) => [
        ...prevState.map((item) =>
          item._id === _id && item.size === sizeCurr && item.color === color
            ? {
                ...item,
                size: defaultSelect,
                color: defaultSelect2,
                imgIndex: findIndex(defaultSelect2),
                totalItem: item.totalItem + resultTotalItem.totalItem,
                totalPrice:
                  item.price * (item.totalItem + resultTotalItem.totalItem),
              }
            : item
        ),
      ]);
    }
    setTimeout(() => setOpenBackdrop(false), 1000);
    handleClose();
  };

  const handleClickRating = () => setShowRating(true);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
      TransitionComponent={Transition}
      transitionDuration={400}
      classes={{ paperWidthSm: classes.paperWidthSm }}
    >
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="container-content">
          <div className="container-slider">
            <ImageGallery
              items={images}
              thumbnailPosition="left"
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
          <div className="container-information">
            <h2 className="information-title">{title}</h2>
            <div className="rating">
              <HoverRating _id={_id} valueRating={valueRating} />
              <div className="rating-length" onClick={handleClickRating}>
                {allRatings.length} ratings
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <strong
                style={
                  discount !== 0
                    ? {
                        textDecorationLine: "line-through",
                        opacity: 0.6,
                      }
                    : null
                }
              >
                ${price}
              </strong>
              {discount !== 0 && (
                <strong className="discount-text">
                  {"$ " + (price - (price * discount) / 100).toFixed(2)}
                </strong>
              )}
            </div>

            <p> {description} </p>
            <div className="information-size">
              <span>Size:</span>
              <RadioGroup
                className="radio-group-size"
                name="size"
                value={defaultSelect}
                onChange={handleChange}
              >
                {size !== undefined &&
                  size.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item}
                      className="radio-size"
                      label={item}
                      control={<Radio />}
                    />
                  ))}
              </RadioGroup>
            </div>
            {!sizeCurr && (
              <div className={showAlert}>
                <Alert
                  className="animate__animated animate__shakeX"
                  severity="error"
                >
                  Please, choose size
                </Alert>
              </div>
            )}
            <div className="information-color">
              <span>Color:</span>
              <RadioGroup
                className="radio-group-color"
                name="color"
                value={defaultSelect2}
                onChange={handleChange2}
              >
                {url !== undefined &&
                  url.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.color}
                      className="radio-color"
                      style={{
                        backgroundColor: item.color,
                        border: currColor(item.color),
                      }}
                      control={<Radio />}
                    />
                  ))}
              </RadioGroup>
            </div>
            {!sizeCurr && (
              <div className="information-quantity">
                <span>Quantity:</span>
                <div className="quantity-btn">
                  <div
                    className="decrease-btn"
                    onClick={handleDecrease}
                    style={{ userSelect: "none" }}
                  >
                    -
                  </div>
                  <input
                    id="quantity-show"
                    className="quantity-show"
                    value={quantity}
                    onClick={handleOnClickInput}
                    onChange={handleChangeInput}
                    onBlur={handleLeaveInput}
                  />
                  <div
                    className="increase-btn"
                    onClick={handleIncrease}
                    style={{ userSelect: "none" }}
                  >
                    +
                  </div>
                </div>
              </div>
            )}
            <div className="container-button">
              <button
                onClick={!sizeCurr ? handleAddToCart : handleUpdateToCart}
              >
                {!sizeCurr ? "ADD TO CART" : "UPDATE TO CART"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackDrop open={openBackdrop} />
      <DialogRating
        open={showRating}
        setOpen={setShowRating}
        title={title}
        _id={_id}
        valueRating={valueRating}
      />
    </Dialog>
  );
};

export default ProductModal;
