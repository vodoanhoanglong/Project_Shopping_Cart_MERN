import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { SlideBar } from "./SlideBar";
import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";
import MultiItemCarousel from "./MultiItemCarousel";
import Footer from "./Footer";

const NavbarMenu = () => {
  const [toggle, setToggle] = useState("");
  const [a, setA] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 10) setToggle("scrolled");
      else setToggle("");
    });
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
        <div
          className="nav-cart"
          onMouseEnter={() => setA(true)}
          onMouseLeave={() => setA(false)}
        >
          <span
            className={
              a
                ? "animate__animated animate__heartBeat id animate__infinite"
                : ""
            }
          >
            0
          </span>
          <Link to="/cart">
            <img src={Cart} alt="" width="20" />
          </Link>
        </div>
        <label htmlFor="menu-btn" className="menu-icon">
          <span className="menu-icon__line"></span>
        </label>
      </header>

      <SlideBar />
      <div>
        <h2
          style={{
            paddingLeft: "290px",
            marginTop: "50px",
            fontFamily: "PlayfairDisplay-Bold",
            fontWeight: "bold",
            fontSize: "40px",
            color: "black",
            textTransform: "uppercase",
          }}
        >
          New Products
        </h2>
      </div>
      <MultiItemCarousel />
      <Footer />
    </>
  );
};

export default NavbarMenu;
