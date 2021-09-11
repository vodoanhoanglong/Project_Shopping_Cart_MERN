import React, { useState, useEffect, useRef, useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";

import CartHover from "../cart/CartHover";
import UserHover from "../user/UserHover";

import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";
import User from "../../assets/user.png";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const NavbarMenu = () => {
  const [toggle, setToggle] = useState("");

  const { cart, setCart, setOpenedPopover, popoverAnchor } =
    useContext(ProductContext);

  const { itemCart, setItemCart, setActiveStep } = useContext(CartContext);

  const { setChoice } = useContext(UserContext);

  let history = useHistory();

  const currentLink = window.location.href.slice(21);

  const isMounted = useRef(false);

  useEffect(() => {
    const getCountCart = JSON.parse(localStorage.getItem("countCart")) || 0;
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(getCountCart);
    setItemCart(getCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("countCart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(itemCart));
  }, [cart, itemCart]);

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 10) setToggle("scrolled");
      else setToggle("");
    });
    return () => (isMounted.current = false);
  }, [toggle]);

  const handleClick = () => history.push(currentLink);

  const handleClickBack = () => {
    history.goBack();
    setActiveStep(0);
  };

  const handleMouseEnter = () =>
    setCart(itemCart.reduce((sum, { totalItem }) => sum + totalItem, 0));

  return (
    <>
      <header
        className={
          currentLink !== "/user"
            ? "main-header " + toggle
            : "main-header user-scrolled " + toggle
        }
      >
        <div className="logo">
          <h1 style={{ color: currentLink === "/user" && "white" }}>
            <Link
              to="/"
              onClick={handleClickBack}
              onMouseEnter={handleMouseEnter}
            >
              Clothes
            </Link>
          </h1>
        </div>
        {currentLink === "/cart" || currentLink === "/user" ? (
          <Link
            to="/shop"
            className={currentLink === "/user" ? "nav-back-user" : "nav-back"}
            onClick={handleClickBack}
            onMouseEnter={handleMouseEnter}
          >
            <span>Back to shop</span> <NavigateNextIcon />
          </Link>
        ) : (
          <>
            <input type="checkbox" className="menu-btn" id="menu-btn" />
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  style={currentLink !== "/" ? null : { color: "#717fe0" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  style={currentLink !== "/shop" ? null : { color: "#717fe0" }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
            </ul>
            <div className="container-icon">
              <div className="nav-user">
                <Tooltip
                  title={<UserHover />}
                  interactive
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Link to="/user" onClick={() => setChoice("profile")}>
                    <img src={User} alt="" width="20" />
                  </Link>
                </Tooltip>
              </div>

              <div
                className="nav-cart"
                ref={popoverAnchor}
                onMouseEnter={() => {
                  document.getElementById("animate").className =
                    "animate__animated animate__heartBeat animate__infinite";
                  setOpenedPopover(true);
                }}
                onMouseLeave={() => {
                  document.getElementById("animate").className = "";
                  setOpenedPopover(false);
                }}
                onBlur={() => setOpenedPopover(false)}
              >
                <span id="animate">{cart}</span>
                <Link to="/cart" onClick={handleClick}>
                  <img src={Cart} alt="" width="20" />
                </Link>
              </div>
            </div>

            <label htmlFor="menu-btn" className="menu-icon">
              <span className="menu-icon__line"></span>
            </label>
            <CartHover handleClick={handleClick} />
          </>
        )}
      </header>
    </>
  );
};

export default NavbarMenu;
