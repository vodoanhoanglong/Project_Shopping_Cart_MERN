import React, { useContext, useEffect, useRef } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Card, Button } from "react-bootstrap";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../css/MultiItemCarousel.css";

const MultiItemCarousel = () => {
  const {
    productState: { products },
    get12Products,
  } = useContext(ProductContext);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    get12Products();
    return () => (isMounted.current = false);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {products.map((item) => {
          return (
            <Card style={{ width: "18rem" }} key={item._id}>
              <Card.Img variant="top" src={item.url}></Card.Img>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{"$ " + item.price}</Card.Text>
                <Button variant="primary">ADD TO CART</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
