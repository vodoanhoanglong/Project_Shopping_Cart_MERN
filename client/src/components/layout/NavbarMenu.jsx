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

  const { cart, setCart, setOpenedPopover, openedPopover } =
    useContext(ProductContext);

  const { itemCart, setItemCart, setActiveStep } = useContext(CartContext);

  const { setChoice, openedUser, setOpenedUser } = useContext(UserContext);

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

  const handleClick = () => {
    setOpenedPopover(false);
    history.push(currentLink);
  };

  const handleClickBackLogo = () => {
    setActiveStep(0);
    setOpenedUser(false);
  };

  const handleClickBack = () => {
    history.goBack();
    handleClickBackLogo();
  };

  const handleMouseEnter = () =>
    setCart(itemCart.reduce((sum, { totalItem }) => sum + totalItem, 0));

  const navbarScroll =
    currentLink !== "/user" ? "main-header " : "main-header user-scrolled ";

  const navbarColor = currentLink === "/user" && "white";

  const navbarMenu = currentLink === "/user" ? "nav-back-user" : "nav-back";

  const navbarMode =
    currentLink === "/cart" || currentLink === "/user" ? true : false;

  const navbarColorItem = (string) =>
    currentLink !== string ? null : { color: "#717fe0" };

  return (
    <>
      <header className={navbarScroll + toggle}>
        <div className="logo">
          <h1 style={{ color: navbarColor }}>
            <Link
              to="/"
              onClick={handleClickBackLogo}
              onMouseEnter={handleMouseEnter}
            >
              Clothes
            </Link>
          </h1>
        </div>
        {navbarMode ? (
          <Link
            to="/shop"
            className={navbarMenu}
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
                <Link to="/" style={navbarColorItem("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" style={navbarColorItem("/shop")}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" style={navbarColorItem("/contact")}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="container-icon">
              <div
                className="nav-user"
                onMouseEnter={() => setOpenedUser(true)}
                onMouseLeave={() => setOpenedUser(false)}
                onBlur={() => setOpenedUser(false)}
              >
                <Tooltip
                  title={<UserHover />}
                  interactive
                  arrow
                  open={openedUser}
                  TransitionComponent={Zoom}
                >
                  <Link to="/user" onClick={() => setChoice("profile")}>
                    <img src={User} alt="" width="20" />
                  </Link>
                </Tooltip>
              </div>

              <div
                className="nav-cart"
                onMouseEnter={() => {
                  document.getElementById("animate").className =
                    "animate__animated animate__heartBeat animate__infinite";
                  setOpenedPopover(true);
                }}
                onMouseLeave={() => {
                  document.getElementById("animate").className = "";
                  setOpenedPopover(false);
                }}
              >
                <span id="animate">{cart}</span>
                <Tooltip
                  title={<CartHover handleClick={handleClick} />}
                  interactive
                  arrow
                  open={openedPopover}
                  TransitionComponent={Zoom}
                >
                  <Link to="/cart" onClick={handleClick}>
                    <img src={Cart} alt="" width="20" />
                  </Link>
                </Tooltip>
              </div>
            </div>

            <label htmlFor="menu-btn" className="menu-icon">
              <span className="menu-icon__line"></span>
            </label>
          </>
        )}
      </header>
    </>
  );
};

export default NavbarMenu;
