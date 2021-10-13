import React from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark ">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Categories</h4>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Shoes</li>
              <li>Watches</li>
            </ul>
          </div>
          <div className="col">
            <h4>Menu</h4>
            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <ul>
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    window.location = "tel:+84932765080";
                    e.preventDefault();
                  }}
                >
                  (+84) 932 765 080
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    window.location = "mailto:vodoanhoanglong10a9@gmail.com";
                    e.preventDefault();
                  }}
                >
                  vodoanhoanglong10a9@gmail.com
                </Link>
              </li>
              <li>
                <p>
                  183 Nguyen Van Tang, Long Thanh My Ward, District 9, Thu Duc
                  City, Vietnam
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
