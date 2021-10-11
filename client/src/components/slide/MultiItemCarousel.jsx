import React, { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

import ShowToast from "../layout/ShowToast";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "../../css/MultiItemCarousel.css";
import CardProduct from "../product/CardProduct";

const MultiItemCarousel = (props) => {
  const { data, setInfo, ...other } = props;
  const { showToastCart } = useContext(CartContext);

  return (
    <div className="slider" data-aos="fade-up" data-aos-duration="1500">
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
          <CardProduct
            key={index}
            product={item}
            setUrlImg={setInfo}
            index={index}
            {...other}
          />
        ))}
      </Carousel>
      <ShowToast title="Added to cart" showToast={showToastCart} />
    </div>
  );
};

export default MultiItemCarousel;
