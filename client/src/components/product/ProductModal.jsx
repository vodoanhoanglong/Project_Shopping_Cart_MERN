import { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import ImageGallery from "react-image-gallery";
import Alert from "@material-ui/lab/Alert";

import "../../css/ProductModal.css";

export const InputQuantity = (props) => {
  const { total, information } = props;

  const { quantity, setQuantity, setCart } = useContext(ProductContext);
  const { itemCart, setItemCart } = useContext(CartContext);

  const regex = /^[0-9\b]+$/;

  const handleSetItemCart = (type = null) => {
    setItemCart((prevState) => [
      ...prevState.map((item) =>
        item._id === information._id &&
        item.size === information.size &&
        item.color === information.color
          ? {
              ...item,
              totalItem:
                type === "increase"
                  ? total + 1
                  : type === "decrease"
                  ? total - 1
                  : 1,
            }
          : item
      ),
    ]);
    setCart((prevCart) =>
      type === "increase"
        ? prevCart + 1
        : type === "decrease"
        ? prevCart - 1
        : prevCart
    );
  };

  const handleIncrease = () =>
    !total
      ? setQuantity(parseInt(quantity + 1))
      : handleSetItemCart("increase");

  const handleDecrease = () =>
    !total
      ? quantity === typeof String
        ? setQuantity(1)
        : quantity <= 1
        ? setQuantity(1)
        : setQuantity(quantity - 1)
      : total <= 1
      ? handleSetItemCart()
      : handleSetItemCart("decrease");

  const handleChangeInput = (e) => {
    let input = e.target.value;
    if (!regex.test(input)) return;
    setQuantity(parseInt(input));
  };
  const handleLeaveInput = () =>
    document.getElementsByClassName("quantity-show")[0].value === ""
      ? setQuantity(1)
      : null;

  return (
    <div className="quantity-btn">
      <div
        className="decrease-btn"
        onClick={handleDecrease}
        style={{ userSelect: "none" }}
      >
        -
      </div>
      <input
        className="quantity-show"
        value={!total ? quantity : total}
        onClick={() => setQuantity("")}
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
  );
};

const ProductModal = ({ product: { _id, title, description, price, url } }) => {
  const [defaultSelect, setDefaultSelect] = useState("DEFAULT");
  const [defaultSelect2, setDefaultSelect2] = useState("DEFAULT");
  const [animate, setAnimate] = useState("animate__fadeInDown");
  const [showAlert1, setShowAlert1] = useState("show-alert");
  const [showAlert2, setShowAlert2] = useState("show-alert");

  const { itemCart, setItemCart, setShowToastCart } = useContext(CartContext);
  const { setCart, setOpenedPopover, quantity, setQuantity } =
    useContext(ProductContext);

  const modal = document.getElementById("myModal");

  const handleChange = (e) => {
    setDefaultSelect(e.target.value);
    if (e.target.value !== "DEFAULT") setShowAlert1("show-alert");
  };
  const handleChange2 = (e) => {
    setDefaultSelect2(e.target.value);
    if (e.target.value !== "DEFAULT") setShowAlert2("show-alert");
  };

  const images = [
    {
      original: url,
      thumbnail: url,
      originalWidth: "550",
      originalHeight: "650",
      thumbnailWidth: "150",
      thumbnailHeight: "100",
    },
    {
      original:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-01.jpg.pagespeed.ic.p3moSJxG7I.webp",
      thumbnail:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-01.jpg.pagespeed.ic.p3moSJxG7I.webp",
      originalWidth: "550",
      originalHeight: "650",
      thumbnailWidth: "150",
      thumbnailHeight: "100",
    },
    {
      original:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-02.jpg.pagespeed.ic.1bDtXoN8v6.webp",
      thumbnail:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-02.jpg.pagespeed.ic.1bDtXoN8v6.webp",
      originalWidth: "550",
      originalHeight: "650",
      thumbnailWidth: "150",
      thumbnailHeight: "100",
    },
    {
      original:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-03.jpg.pagespeed.ic.-rPS2k8YRO.webp",
      thumbnail:
        "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-03.jpg.pagespeed.ic.-rPS2k8YRO.webp",
      originalWidth: "550",
      originalHeight: "650",
      thumbnailWidth: "150",
      thumbnailHeight: "100",
    },
  ];

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
        price,
        totalItem: quantity,
        size: defaultSelect,
        color: defaultSelect2,
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
          ? { ...item, totalItem: currentQuantity }
          : item
      ),
    ]);
    updateCountCart();
    setTimeOutPopover();
  };

  const handleClose = () => {
    setAnimate("animate__fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      setDefaultSelect("DEFAULT");
      setDefaultSelect2("DEFAULT");
      setQuantity(1);
      setAnimate("animate__fadeInDown");
      setShowAlert1("show-alert");
      setShowAlert2("show-alert");
    }, 400);
  };

  const handleAddToCart = () => {
    if (defaultSelect === "DEFAULT") setShowAlert1("");
    if (defaultSelect2 === "DEFAULT") setShowAlert2("");
    if (defaultSelect !== "DEFAULT" && defaultSelect2 !== "DEFAULT") {
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
      handleClose();
    }
  };

  window.onclick = (e) => (e.target === modal ? handleClose() : null);

  return (
    <div id="myModal" className={"modal animate__animated " + animate}>
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
            ;
          </div>
          <div className="container-information">
            <h2 className="information-title">{title}</h2>
            <strong>${price}</strong>
            <p> {description} </p>
            <div className="information-size">
              <span>Size</span>
              <select
                className="form-select"
                aria-label="Default select example"
                name="size"
                value={defaultSelect}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className={showAlert1}>
              <Alert
                className="animate__animated animate__shakeX"
                severity="error"
              >
                Please, choose size
              </Alert>
            </div>

            <div className="information-color">
              <span>Color</span>
              <select
                className="form-select"
                aria-label="Default select example"
                name="color"
                value={defaultSelect2}
                onChange={handleChange2}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
              </select>
            </div>
            <div className={showAlert2}>
              <Alert
                className="animate__animated animate__shakeX"
                severity="error"
              >
                Please, choose color
              </Alert>
            </div>

            <div className="information-quantity">
              <span>Quantity</span>
              <InputQuantity />
            </div>
            <div className="container-button">
              <button onClick={handleAddToCart}>ADD TO CART</button>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
