import React from "react";
import { Carousel } from "react-bootstrap";
import "../../css/SlideBar.css";
export const SlideBar = () => {
  return (
    <div>
      <Carousel fade pause={false} prevLabel={null} nextLabel={null}>
        <Carousel.Item interval="2000">
          <img
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/xslide-02.jpg.pagespeed.ic.__MQeyG5T4.webp"
            alt="First slide"
          />
          <Carousel.Caption className="caption">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval="2000">
          <img
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/xslide-01.jpg.pagespeed.ic.XotvXKn0Mi.webp"
            alt="Second slide"
          />

          <Carousel.Caption className="caption">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval="2000">
          <img
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/xslide-03.jpg.pagespeed.ic.tP-L47NU9M.webp"
            alt="Third slide"
          />

          <Carousel.Caption className="caption">
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
