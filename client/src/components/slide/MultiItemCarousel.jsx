import React, { useContext } from "react";
import { Card } from "react-bootstrap";

import { CartContext } from "../../contexts/CartContext";

import ShowToast from "../layout/ShowToast";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "../../css/MultiItemCarousel.css";

const MultiItemCarousel = (props) => {
  const { data, setOpenDialog, setInfo, ...other } = props;

  const { showToastCart } = useContext(CartContext);
  if (other.label) console.log(other.label);

  const handleClick = (event, product) => {
    setInfo(product);
    setOpenDialog(true);
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
        {data.map((item, index) => (
          <Card className="card-multi-carousel" key={item._id}>
            <div className="block-pic">
              <Card.Img variant="top" src={item.url}></Card.Img>
              <button onClick={(e) => handleClick(e, item)}>ADD TO CART</button>
            </div>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <div className="container-blob">
                <Card.Text>{"$ " + item.price}</Card.Text>
                {other.label && (
                  <div className="container-blob">
                    <span>{other.label[index].favorites}</span>
                    <i className="fas fa-heart "></i>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
      <ShowToast title="Added to cart" showToast={showToastCart} />
    </div>
  );
};

export default MultiItemCarousel;
