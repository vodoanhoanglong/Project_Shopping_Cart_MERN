import React, { useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import "../../css/SlideBar.css";

export const SlideBar = () => {
  return (
    <Carousel fade pause={false} prevLabel={null} nextLabel={null}>
      <Carousel.Item interval="4000">
        <img
          className="d-block w-100"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-02.jpg.pagespeed.ic.__MQeyG5T4.webp"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Men New Season</h3>
          <h2 className="animate__animated animate__bounceInLeft  ">
            Jackets & Coats
          </h2>
          <Button>Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval="4000">
        <img
          className="d-block w-100"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-01.jpg.pagespeed.ic.XotvXKn0Mi.webp"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Women collection 2020</h3>
          <h2 className="animate__animated animate__bounceInLeft">
            New season
          </h2>
          <Button>Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval="4000">
        <img
          className="d-block w-100"
          src="https://preview.colorlib.com/theme/cozastore/images/xslide-03.jpg.pagespeed.ic.tP-L47NU9M.webp"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Men collection 2020</h3>
          <h2 className="animate__animated animate__bounceInLeft ">
            New arrivals
          </h2>
          <Button>Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
