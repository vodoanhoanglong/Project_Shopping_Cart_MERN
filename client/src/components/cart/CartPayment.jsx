import React, { useContext } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Carousel from "react-multi-carousel";

import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../../contexts/CartContext";

import "react-multi-carousel/lib/styles.css";
import "../../css/CartPayment.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CartPayment = () => {
  const classes = useStyles();

  const { itemCart, value, date, handleNext, handleBack } =
    useContext(CartContext);

  const creditCard = value.cardNumber !== "" ? true : false;

  let totalBill = itemCart.reduce((sum, { totalPrice }) => sum + totalPrice, 0);
  if (value.couponCode !== "") totalBill = totalBill - (totalBill * 10) / 100;

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  return (
    <div
      className="animate__animated animate__fadeIn"
      style={{ height: "70vh", backgroundColor: "#F7F8FA" }}
    >
      <div className="container-card-bill-information">
        <Card className={classes.root}>
          <CardContent>
            <h2>Bill Information</h2>
            <div className="card-bill-information">
              <p>
                <b>Full name:</b> {value.fullName}
              </p>
              <p>
                <b>Phone number:</b> {value.phone}
              </p>
              <p>
                <b>Address:</b> {value.address}
              </p>
              {creditCard && (
                <p>
                  <b>Credit card number:</b> {value.cardNumber}
                </p>
              )}
              {creditCard && (
                <p>
                  <b>Expiration date of Credit card:</b> {date.month}/
                  {date.year}
                </p>
              )}
              <p>
                <b>Payment day:</b> {today}
              </p>
              <h5>
                <b>Total:</b> ${totalBill.toFixed(2)}
              </h5>
            </div>
          </CardContent>
          <CardActions>
            <div className="container-button-payment-finished">
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Complete Bill</button>
            </div>
          </CardActions>
        </Card>
      </div>
      <div className="container-card-bill-information">
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {itemCart.map((item, index) => (
            <div key={index}>
              <img src={item.url} alt="" style={{ width: 120, height: 120 }} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CartPayment;
