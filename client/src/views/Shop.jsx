import React from "react";

import NavbarMenu from "../components/layout/NavbarMenu";

import "../css/Shop.css";

const Shop = () => {
  return (
    <div>
      <NavbarMenu />
      <div className="shop-container">
        <div className="d-flex">
          <div>
            <button>All product</button>
            <button>Women</button>
            <button>Men</button>
            <button>Shoes</button>
            <button>Watch</button>
          </div>
          <div>
            <button>Filter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
