import React, { useContext } from "react";

import Carousel from "react-multi-carousel";

import { CartContext } from "../../contexts/CartContext";

import "react-multi-carousel/lib/styles.css";
import "../../css/CartSlider.css";

const CartSlider = () => {
  const { itemCart } = useContext(CartContext);
  return (
    <>
      <h1 className="title-cart">Your Cart</h1>
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
        {itemCart.map((item, index) => (
          <div key={index}>
            <span className="total-item-cart-slider">
              {item.size}&nbsp;-&nbsp;
              <div
                className="color-popover"
                style={{ backgroundColor: item.color }}
              ></div>
              &nbsp;-&nbsp;x
              {item.totalItem}
            </span>
            <img
              src={item.url[item.imgIndex].img[0]}
              alt=""
              style={{ width: 180, height: 200 }}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CartSlider;
