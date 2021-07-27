import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { SlideBar } from "./SlideBar";
import "../../css/NavbarMenu.css";
import Cart from "../../assets/shopping-cart.png";
import MultiItemCarousel from "./MultiItemCarousel";

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
      <MultiItemCarousel />
      {/* <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illo
        doloribus deserunt ad nulla fugit tempora iusto quam! Cum incidunt illo
        doloribus veritatis consequatur obcaecati sunt ratione excepturi
        repellendus magni quae minus, sit perferendis a magnam aspernatur
        eveniet natus? Dolores assumenda delectus cupiditate sed nihil qui
        tempore aliquid corporis sunt sapiente! Cumque distinctio laboriosam
        reprehenderit commodi impedit illum voluptates dolorem nulla.
        Accusantium neque harum reiciendis ut perferendis molestiae, nulla
        ducimus? Sequi provident temporibus ratione dolores dolor amet sint
        aspernatur ad, illo nobis fuga ullam mollitia quae similique
        consequuntur accusamus soluta, minus saepe veritatis fugiat debitis
        voluptate! Est pariatur similique tempora id incidunt. Velit sequi
        corrupti, esse, quia rerum in repudiandae suscipit quod officiis
        assumenda, quam sed voluptate. Exercitationem odio eaque voluptatem
        voluptatum possimus reiciendis eligendi, ut suscipit quaerat assumenda,
        nostrum veniam quisquam. Expedita atque natus esse repellendus veniam
        reprehenderit, deleniti illum assumenda quisquam suscipit in quas
        consequatur impedit optio vel vero eum voluptas inventore cupiditate, at
        maiores sunt asperiores laboriosam. Alias autem natus at delectus
        perferendis optio, ad nesciunt dolores quasi. Vel, quod repellendus? Id
        eligendi ex hic doloribus voluptatem incidunt excepturi dolorum amet,
        veritatis quidem illum earum eaque ipsum aspernatur animi facilis. Vero
        quasi quis quod accusamus porro doloremque.
      </div> */}
    </>
  );
};

export default NavbarMenu;
