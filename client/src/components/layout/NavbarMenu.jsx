import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlideBar } from "./SlideBar";
import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";

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

      {/* <div className="hero">
        <h1>Hero Text</h1>
      </div> */}
      <SlideBar />
      <div className="container">
        <p className="animate__fadeInLeft">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          id rem omnis excepturi illo? Mollitia a, eum sequi aliquid ullam
          maxime hic modi minima asperiores quasi repellat atque, iste eveniet
          dolorem dicta earum alias numquam tempore illo ab! Ducimus nihil,
          adipisci repellendus deserunt laudantium doloremque, molestias
          corporis ullam pariatur neque vitae nemo iusto nulla quisquam ratione
          reiciendis praesentium libero quidem quas maxime. Voluptatibus id
          eaque natus? Autem error, vitae tenetur rem accusamus quae nulla
          necessitatibus exercitationem ea voluptatem, sunt a eum nihil atque
          quod maxime, ratione deleniti? Error, fugit dolorum? Eum doloribus
          magni repellendus nulla cum, velit iure doloremque tenetur id officiis
          asperiores recusandae illum, illo a minus! Sed officia repellat
          laudantium quis consequatur, hic ipsa cupiditate dolor, at ut,
          quisquam et illo? Repellendus sunt in soluta eaque ipsa maxime veniam
          esse eos accusantium aperiam? Quod tempora, in aut neque facilis quia
          expedita, eum vero aliquam porro ipsum quasi, ducimus natus! Facere,
          alias sed, eius dignissimos beatae a at assumenda rerum aut modi vero
          eaque consequuntur, praesentium tempora? Blanditiis expedita fuga
          possimus ad omnis nesciunt ut corrupti deleniti odit, voluptates
          excepturi modi commodi repellat, reprehenderit mollitia nam nulla
          rerum libero ipsam porro non corporis! Tempore nam molestias eaque et
          laborum.
        </p>
      </div>
    </>
  );
};

export default NavbarMenu;
