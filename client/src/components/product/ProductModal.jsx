import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import ImageGallery from "react-image-gallery";
import Alert from "@material-ui/lab/Alert";

import "../../css/ProductModal.css";

const ProductModal = (props) => {
  const {
    _id,
    size,
    color,
    product: { title, description, price, url },
  } = props;

  const [defaultSelect, setDefaultSelect] = useState(!size ? "DEFAULT" : size);
  const [defaultSelect2, setDefaultSelect2] = useState(
    !color ? "DEFAULT" : color
  );

  const [animate, setAnimate] = useState("animate__fadeInDown");
  const [showAlert1, setShowAlert1] = useState("show-alert");
  const [showAlert2, setShowAlert2] = useState("show-alert");

  const { itemCart, setItemCart, setShowToastCart } = useContext(CartContext);
  const { setCart, setOpenedPopover, quantity, setQuantity } =
    useContext(ProductContext);

  // khi truyền props xuống để làm constructor cho State thì nên dùng useEffect
  useEffect(() => {
    setDefaultSelect(size);
    setDefaultSelect2(color);
  }, [size, color]);

  const modal = document.getElementById("myModal");
  const regex = /^[0-9\b]+$/;

  const handleChange = (e) => {
    setDefaultSelect(e.target.value);
    if (e.target.value !== "DEFAULT") setShowAlert1("show-alert");
  };
  const handleChange2 = (e) => {
    setDefaultSelect2(e.target.value);
    if (e.target.value !== "DEFAULT") setShowAlert2("show-alert");
  };

  const handleIncrease = () => setQuantity(quantity + 1);

  const handleDecrease = () =>
    quantity === typeof String
      ? setQuantity(1)
      : quantity <= 1
      ? setQuantity(1)
      : setQuantity(quantity - 1);

  const handleChangeInput = (e) => {
    let input = e.target.value;
    if (!regex.test(input)) return;
    setQuantity(parseInt(input));
  };

  const handleLeaveInput = () =>
    document.getElementById("quantity-show").value === ""
      ? setQuantity(1)
      : null;

  const handleOnClickInput = () => setQuantity("");

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
        description,
        totalItem: quantity,
        size: defaultSelect,
        color: defaultSelect2,
        totalPrice: price * quantity,
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
    setAnimate("animate__fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      if (!size) {
        setDefaultSelect("DEFAULT");
        setDefaultSelect2("DEFAULT");
      } else {
        setDefaultSelect(size);
        setDefaultSelect2(color);
      }
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

  const handleUpdateToCart = () => {
    const resultTotalItem = itemCart.find(
      (item) =>
        item._id === _id &&
        item.size === defaultSelect &&
        item.color === defaultSelect2
    );
    if (resultTotalItem) {
      const resultSearchItem = itemCart.indexOf(resultTotalItem);
      itemCart.splice(resultSearchItem, 1);
      setItemCart(itemCart);

      setItemCart((prevState) => [
        ...prevState.map((item) =>
          item._id === _id && item.size === size && item.color === color
            ? {
                ...item,
                size: defaultSelect,
                color: defaultSelect2,
                totalItem: item.totalItem + resultTotalItem.totalItem,
                totalPrice:
                  item.price * (item.totalItem + resultTotalItem.totalItem),
              }
            : item
        ),
      ]);
    }
    setItemCart((prevState) => [
      ...prevState.map((item) =>
        item._id === _id && item.size === size && item.color === color
          ? {
              ...item,
              size: defaultSelect,
              color: defaultSelect2,
            }
          : item
      ),
    ]);
    handleClose();
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
                {!size && (
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                )}
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            {!size && (
              <div className={showAlert1}>
                <Alert
                  className="animate__animated animate__shakeX"
                  severity="error"
                >
                  Please, choose size
                </Alert>
              </div>
            )}

            <div className="information-color">
              <span>Color</span>
              <select
                className="form-select"
                aria-label="Default select example"
                name="color"
                value={defaultSelect2}
                onChange={handleChange2}
              >
                {!color && (
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                )}
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
              </select>
            </div>
            {!color && (
              <div className={showAlert2}>
                <Alert
                  className="animate__animated animate__shakeX"
                  severity="error"
                >
                  Please, choose color
                </Alert>
              </div>
            )}

            {!size && (
              <div className="information-quantity">
                <span>Quantity</span>
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
              <button onClick={!size ? handleAddToCart : handleUpdateToCart}>
                {!size ? "ADD TO CART" : "UPDATE TO CART"}
              </button>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
