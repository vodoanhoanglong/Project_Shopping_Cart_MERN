import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../css/SlideBar.css";

export const SlideBar = () => {
  const [a, setA] = useState(true);
  const [pause, setPause] = useState(false);

  const linkToShop = (
    <Link to="/shop">
      <Button
        onMouseEnter={() => setPause("hover")}
        onMouseLeave={() => setPause(false)}
      >
        Shop now
      </Button>
    </Link>
  );

  return (
    <Carousel
      fade
      pause={pause}
      prevLabel={null}
      nextLabel={null}
      onSlid={() => setA(!a)}
    >
      <Carousel.Item interval="4000">
        <img
          className="d-block w-100 slide-bar-img"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-02.jpg.pagespeed.ic.__MQeyG5T4.webp"
          alt="First slide"
        />

        <Carousel.Caption
          className={
            a
              ? "animate__animated animate__bounceInLeft"
              : "animate__animated animate__bounceInRight"
          }
        >
          <h3>Men New Season</h3>
          <h2>Jackets & Coats</h2>
          {linkToShop}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval="4000">
        <img
          className="d-block w-100 slide-bar-img"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-01.jpg.pagespeed.ic.XotvXKn0Mi.webp"
          alt="Second slide"
        />

        <Carousel.Caption
          className={
            a
              ? "animate__animated animate__bounceInLeft"
              : "animate__animated animate__bounceInRight"
          }
        >
          <h3>Women collection 2020</h3>
          <h2>New season</h2>
          {linkToShop}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval="4000">
        <img
          className="d-block w-100 slide-bar-img"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-03.jpg.pagespeed.ic.tP-L47NU9M.webp"
          alt="Third slide"
        />

        <Carousel.Caption
          className={
            a
              ? "animate__animated animate__bounceInLeft"
              : "animate__animated animate__bounceInRight"
          }
        >
          <h3>Men collection 2021</h3>
          <h2>New arrivals</h2>
          {linkToShop}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
