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

  const handleClick = (event, product) => {
    setInfo(product);
    setOpenDialog(true);
  };

  return (
    <div className="slider">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        containerClass="carousel-container"
        dotListClass=""
        draggable
        focusOnSelect={false}
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
        autoPlay={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        customTransition="transform 800ms ease-in-out"
      >
        {data.map((item, index) => (
          <Card className="card-multi-carousel" key={item._id}>
            {item.discount !== 0 && (
              <div className="label-discount">
                <b>-{item.discount}%</b>
              </div>
            )}
            <div className="block-pic">
              <Card.Img variant="top" src={item.url}></Card.Img>
              <button onClick={(e) => handleClick(e, item)}>ADD TO CART</button>
            </div>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <div className="container-blob">
                <div style={{ display: "flex" }}>
                  <Card.Text
                    style={
                      item.discount !== 0
                        ? {
                            textDecorationLine: "line-through",
                            opacity: 0.6,
                          }
                        : null
                    }
                  >
                    {"$ " + item.price}
                  </Card.Text>
                  {item.discount !== 0 && (
                    <Card.Text className="discount-text">
                      {"$ " +
                        (
                          item.price -
                          (item.price * item.discount) / 100
                        ).toFixed(2)}
                    </Card.Text>
                  )}
                </div>

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
