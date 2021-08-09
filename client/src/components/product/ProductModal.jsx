import React from "react";
import Slider from "react-slick";

const ProductModal = ({ url }) => {
  const styled = { height: "80px", width: "80px" };

  const settings = {
    customPaging: function (i) {
      return (
        <img
          src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract0${
            i + 1
          }.jpg`}
          alt=""
          style={styled}
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const modal = document.getElementById("myModal");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => (modal.style.display = "none")}>
          &times;
        </span>
        <Slider {...settings}>
          {/* <div>
            <img src={url} alt="" style={styled} />
          </div> */}
          <div>
            <img
              src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ProductModal;
