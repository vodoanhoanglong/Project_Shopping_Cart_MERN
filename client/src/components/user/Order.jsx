import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { Pagination } from "@material-ui/lab";

import Carousel from "react-multi-carousel";

import emptyOrder from "../../assets/empty-order.png";
import "react-multi-carousel/lib/styles.css";
import "../../css/Order.css";

const Order = () => {
  const {
    orderState: { order },
    getOrder,
  } = React.useContext(UserContext);
  const {
    authState: { isAuthenticated, user },
  } = React.useContext(AuthContext);
  React.useEffect(() => (isAuthenticated ? getOrder(user._id) : null), []);

  const [page, setPage] = React.useState(1);

  const perPage = 3;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(order.length / perPage);

  const handleChangePage = (event, value) => setPage(value);

  return (
    <div
      className="order animate__animated animate__fadeIn"
      style={{ textAlign: "center" }}
    >
      <h1>My Order</h1>
      {order.length ? (
        <div className="user-order">
          {order.slice(start, end).map((item, index) => (
            <div className="user-all-order" key={index}>
              <div className="header-order">
                <h4>{item.createAt}</h4>
                {item.discount !== 0 && <h4>-{item.discount}%</h4>}
                <h4>${item.totalPrice}</h4>
              </div>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                containerClass="carousel-container"
                itemClass=""
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
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
                {item.cart.map((product, key) => (
                  <div key={key}>
                    <span
                      style={{ width: "93%" }}
                      className="total-item-cart-slider"
                    >
                      ${product.price}&nbsp;-&nbsp;
                      {product.size}&nbsp;-&nbsp;
                      <div
                        className="color-popover"
                        style={{ backgroundColor: product.color }}
                      ></div>
                      &nbsp;-&nbsp;x
                      {product.totalItem}
                    </span>
                    <img
                      src={product.url[product.imgIndex].img[0]}
                      alt=""
                      style={{ width: 180, height: 200 }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          ))}
          <Pagination
            style={{ marginBottom: 50, marginTop: 50 }}
            count={totalPage}
            size="large"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      ) : (
        <div className="empty-order">
          <img src={emptyOrder} alt="" style={{ width: 180, height: 180 }} />
          <h1>You don't have any orders</h1>
        </div>
      )}
    </div>
  );
};

export default Order;
