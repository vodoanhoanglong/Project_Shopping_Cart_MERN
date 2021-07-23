import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";

const NavbarMenu = () => {
  const [toggle, setToggle] = useState("");
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
        <div className="nav-cart">
          <span>0</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="20" />
          </Link>
        </div>
        <label htmlFor="menu-btn" className={"menu-icon " + toggle}>
          <span className="menu-icon__line"></span>
        </label>
      </header>

      <div className="hero">
        <h1>Hero Text</h1>
      </div>
      <div className="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          cum dolorum iusto id adipisci ipsa harum nisi fugiat saepe recusandae?
        </p>
      </div>
    </>
  );
};

export default NavbarMenu;
