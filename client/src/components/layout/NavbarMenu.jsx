import React, { useState, useEffect, useRef, useContext } from "react";

import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";
import CartHover from "../cart/CartHover";

const NavbarMenu = () => {
  const [toggle, setToggle] = useState("");
  const { cart, setShowCart } = useContext(ProductContext);
  const linkColor = window.location.href.slice(21);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 10) setToggle("scrolled");
      else setToggle("");
    });
    return () => (isMounted.current = false);
  }, [toggle]);
  return (
    <>
      <header className={"main-header " + toggle}>
        <div className="logo">
          <h1>
            <Link to="/">Clothes</Link>
          </h1>
        </div>
        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              style={linkColor !== "/" ? null : { color: "#717fe0" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              style={linkColor !== "/shop" ? null : { color: "#717fe0" }}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
        <div
          className="nav-cart"
          onMouseEnter={(event) => {
            document.getElementById("animate").className =
              "animate__animated animate__heartBeat animate__infinite";
            setShowCart(event.currentTarget);
          }}
          onMouseLeave={() => {
            document.getElementById("animate").className = "";
            setShowCart(null);
          }}
        >
          <span id="animate">{cart}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="20" />
          </Link>
        </div>
        <label htmlFor="menu-btn" className="menu-icon">
          <span className="menu-icon__line"></span>
        </label>
        <CartHover />
      </header>
    </>
  );
};

export default NavbarMenu;
