import React from "react";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark " style={{ height: "200px" }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Categories</h4>
            <ul>
              <li>Menu</li>
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
                <a href="tel:+84932765080">(+84) 932 765 080</a>
              </li>
              <li>
                <a href="mailto:vodoanhoanglong10a9@gmail.com">
                  vodoanhoanglong10a9@gmail.com
                </a>
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
