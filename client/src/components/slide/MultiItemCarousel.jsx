import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import ProductModal from "../product/ProductModal";
import ShowToast from "../layout/ShowToast";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "../../css/MultiItemCarousel.css";

const MultiItemCarousel = () => {
  const [info, setInfo] = useState("");

  const {
    productState: { products },
    get12Products,
  } = useContext(ProductContext);

  const { showToastCart } = useContext(CartContext);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    get12Products();
    return () => (isMounted.current = false);
  }, []);

  const handleClick = (event, product) => {
    setInfo(product);
    document.getElementById("myModal").style.display = "block";
  };

  return (
    <div className="slider">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="carousel-container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {products.map((item, index) => (
          <Card
            style={{
              width: "19rem",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
            key={item._id}
          >
            <div className="block-pic">
              <Card.Img variant="top" src={item.url}></Card.Img>
              <Link to="#" onClick={(e) => handleClick(e, item)}>
                ADD TO CART
              </Link>
            </div>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{"$ " + item.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
      <ProductModal _id={info._id} product={info} />
      <ShowToast title="Added to cart" showToast={showToastCart} />
    </div>
  );
};

export default MultiItemCarousel;
