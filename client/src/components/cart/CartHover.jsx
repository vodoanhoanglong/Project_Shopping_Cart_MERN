import { useContext, useEffect } from "react";

import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import Popover from "@material-ui/core/Popover";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

import "../../css/CartHover.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
  },
}));

const CartHover = (props) => {
  const { handleClick } = props;

  const { openedPopover, setOpenedPopover, popoverAnchor } =
    useContext(ProductContext);
  const { itemCart, showToastCart } = useContext(CartContext);

  const classes = useStyles();

  const resultTotalPrice = itemCart.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  const handleShowPopover = () => setOpenedPopover(true);
  const handleHidePopover = () => setOpenedPopover(false);

  const handleClickPopover = () => {
    handleHidePopover();
    handleClick();
  };

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={openedPopover}
      anchorEl={popoverAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        onMouseEnter: handleShowPopover,
        onMouseLeave: handleHidePopover,
      }}
      marginThreshold={50}
      disableRestoreFocus
    >
      {showToastCart && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Added to cart
        </Alert>
      )}
      <div className="popover-cart">
        {itemCart.map((item, index) => (
          <div key={index} className="popover-item">
            <img src={item.url} alt="" />
            <div className="item-information">
              <h5>{item.title}</h5>
              <p className="price-information">${item.price}</p>
              <div className="item-information-child">
                <p>{item.totalItem}</p>
                <p>{item.size}</p>
                <p>{item.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-popover">
        <Link to="/cart" onClick={handleClickPopover}>
          View Cart
        </Link>
        <div className="total-price">
          total price: <strong>${resultTotalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </Popover>
  );
};

export default CartHover;
