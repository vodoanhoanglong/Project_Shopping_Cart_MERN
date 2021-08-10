import { useState } from "react";
import Slider from "react-slick";

const ProductModal = ({ product: { title, description, price } }) => {
  const [defaultSelect, setDefaultSelect] = useState("DEFAULT");

  const styled = { width: "550px", height: "650px" };
  const modal = document.getElementById("myModal");
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      setDefaultSelect("DEFAULT");
    }
  };
  const handleChange = (e) => setDefaultSelect(e.target.value);

  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            modal.style.display = "none";
            setDefaultSelect("DEFAULT");
          }}
        >
          &times;
        </span>
        <div className="container-content">
          <div className="container-slider">
            <Slider {...settings}>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-01.jpg.pagespeed.ic.p3moSJxG7I.webp"
                  }
                />
              </div>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-02.jpg.pagespeed.ic.1bDtXoN8v6.webp"
                  }
                />
              </div>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-03.jpg.pagespeed.ic.-rPS2k8YRO.webp"
                  }
                />
              </div>
            </Slider>
          </div>
          <div className="container-information">
            <h2 className="information-title">{title}</h2>
            <strong>${price}</strong>
            <p> {description} </p>
            <div className="information-size">
              <span>Size</span>
              <select
                className="form-select"
                aria-label="Default select example"
                value={defaultSelect}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="information-color">
              <span>Color</span>
              <select
                className="form-select"
                aria-label="Default select example"
                value={defaultSelect}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
              </select>
            </div>
            <div className="information-quality">
              <span>Quality</span>
              <div className="quality-btn">
                <div className="increase-btn">-</div>
                <div className="quality-show">1</div>
                <div className="decrease-btn">+</div>
              </div>
            </div>

            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
