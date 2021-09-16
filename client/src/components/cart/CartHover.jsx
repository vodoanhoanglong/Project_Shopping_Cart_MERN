import { useContext } from "react";

import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import "../../css/CartHover.css";
import CartEmpty from "../../assets/empty-cart-hover.png";

import { Link } from "react-router-dom";

const CartHover = (props) => {
  const { handleClick } = props;

  const { setOpenedPopover } = useContext(ProductContext);
  const { itemCart } = useContext(CartContext);
  const { cart } = useContext(ProductContext);

  const resultTotalPrice = itemCart.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  const handleHidePopover = () => setOpenedPopover(false);

  const handleClickPopover = () => {
    handleHidePopover();
    handleClick();
  };

  const emptyCart = (
    <div className="popover-cart-empty">
      <img src={CartEmpty} alt="" style={{ width: 150, height: 150 }} />
      <h4>Cart is empty</h4>
    </div>
  );
  const showScroll = itemCart.length > 2 && "popover-cart-scroll";
  return (
    <div
      className="tooltip-cart"
      onMouseEnter={() => (document.getElementById("animate").className = "")}
    >
      {cart !== 0 ? (
        <>
          <div className={"popover-cart " + showScroll}>
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
              <p>total price:</p>
              <strong>${resultTotalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </>
      ) : (
        emptyCart
      )}
    </div>
  );
};

export default CartHover;
