import React, { useState, useContext } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import Alert from "@material-ui/lab/Alert";

import CartSlider from "./CartSlider";

import { CartContext } from "../../contexts/CartContext";

import "../../css/CartOrder.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formControlSelected: {
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CartOrder = () => {
  const [error, setError] = useState({
    couponCode: false,
    paymentMethod: false,
  });

  const {
    itemCart,
    value,
    setValue,
    date,
    setDate,
    length,
    setLength,
    icon,
    setIcon,
    disabled,
    setDisabled,
    handleNext,
    handleBack,
  } = useContext(CartContext);

  const resultTotalPrice = itemCart.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  const classes = useStyles();

  const coupon = "HOANGLONGDEPZAIVCL";

  const regexFullName = /^[^0-9\b]{2,40}$/;
  const regexPhone = /^[0][0-9\b]{9,11}$/;
  const regexAddress = /[A-Za-z0-9'\.\-\s\,]{30,120}$/;

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [];

  const yearCurrent = new Date().getFullYear();
  const yearFuture = yearCurrent + 28;
  for (let year = yearCurrent; year < yearFuture; year++) years.push(year);

  const handleChange = (regex) => (e) => {
    const inputName = e.target.name;
    const inputLength = e.target.value.length;
    const inputValue = e.target.value;
    setLength((prevLength) => ({
      ...prevLength,
      [inputName]: inputLength,
    }));
    setValue((prevValue) => ({ ...prevValue, [inputName]: inputValue }));
    if (!regex.test(inputValue) || inputValue === "")
      setIcon((prevIcon) => ({ ...prevIcon, [inputName]: false }));
    else setIcon((prevIcon) => ({ ...prevIcon, [inputName]: true }));
  };

  const handleChangePaymentMethod = (e) =>
    !/^[0-9]*$/.test(e.target.value)
      ? null
      : setValue((prevValue) => ({
          ...prevValue,
          [e.target.name]: e.target.value,
        }));

  const handleRadioChange = (e) => {
    if (e.target.value === "online") setDisabled(false);
    else {
      setDisabled(true);
      setValue((prevValue) => ({ ...prevValue, cardNumber: "" }));
      setDate({
        month: "",
        year: "",
      });
    }
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSelected = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setDate((prevDate) => ({ ...prevDate, [inputName]: inputValue }));
  };

  const handleChangeCouponCode = (e) =>
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const couponCode = value.couponCode;
    if (couponCode !== coupon && couponCode !== "")
      setError((prevError) => ({ ...prevError, couponCode: true }));
    else setError((prevError) => ({ ...prevError, couponCode: false }));
    if (value.radio === "offline")
      setError((prevError) => ({ ...prevError, paymentMethod: false }));
    else if (value.radio === "online")
      setError((prevError) => ({ ...prevError, paymentMethod: false }));
    else setError((prevError) => ({ ...prevError, paymentMethod: true }));
    if (
      (value.radio !== "" && couponCode === coupon) ||
      (value.radio !== "" && couponCode === "")
    )
      handleNext();
  };

  return (
    <div
      className="animate__animated animate__fadeIn"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="container-cart-form">
          <div className="form-information-user">
            <h4>Delivery address</h4>
            <div className="input-cart">
              <TextField
                id="filled-basic-name"
                label="Full name"
                fullWidth
                margin="dense"
                name="fullName"
                value={value.fullName}
                inputProps={{
                  maxLength: 40,
                  minLength: 2,
                  pattern: "\\D*",
                }}
                required
                onChange={handleChange(regexFullName)}
              />
              <div className="input-length-icon">
                {icon.fullName && <DoneIcon className="icon-input-complete" />}
                <p>{length.fullName}/40</p>
              </div>
            </div>
            <div className="input-cart">
              <TextField
                id="filled-basic-phone"
                label="Phone number"
                fullWidth
                margin="dense"
                name="phone"
                value={value.phone}
                inputProps={{
                  maxLength: 12,
                  minLength: 10,
                  pattern: "[0][0-9]{9,11}",
                }}
                required
                onChange={handleChange(regexPhone)}
              />
              <div className="input-length-icon">
                {icon.phone && <DoneIcon className="icon-input-complete" />}
                <p>{length.phone}/12</p>
              </div>
            </div>
            <div className="input-cart">
              <TextField
                id="filled-basic-address"
                label="Address"
                fullWidth
                margin="dense"
                name="address"
                value={value.address}
                onChange={handleChange(regexAddress)}
                required
              />
              <div className="input-length-icon">
                {icon.address && <DoneIcon className="icon-input-complete" />}
                <p>{length.address}/120</p>
              </div>
            </div>

            <TextField
              id="filled-basic-coupon"
              label="Coupon CODE"
              fullWidth
              margin="dense"
              name="couponCode"
              value={value.couponCode}
              inputProps={{
                minLength: 6,
              }}
              onChange={handleChangeCouponCode}
            />
            {error.couponCode && (
              <div className="show-alert">
                <Alert
                  className="animate__animated animate__shakeX"
                  severity="error"
                >
                  Invalid Coupon CODE
                </Alert>
              </div>
            )}
            <h3 style={{ marginTop: 40 }}>
              Total bill: <b>${resultTotalPrice.toFixed(2)}</b>
            </h3>
          </div>

          <div className="payment-method">
            <h4>Payment method</h4>
            <FormControl
              component="fieldset"
              error={error.paymentMethod}
              className={classes.formControl}
            >
              <RadioGroup
                aria-label="quiz"
                name="radio"
                value={value.radio}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  style={{ marginBottom: 20 }}
                  value="offline"
                  control={<Radio />}
                  label={
                    <>
                      <img
                        src="//img.ltwebstatic.com/images2_pi/2018/06/06/15282728403108279621.png"
                        className="payment-src"
                        alt=""
                      ></img>
                      <span className="payment-des">Payment on delivery</span>
                    </>
                  }
                />
                <FormControlLabel
                  style={{ marginBottom: 20 }}
                  value="online"
                  control={<Radio />}
                  label={
                    <>
                      <img
                        src="//img.ltwebstatic.com/images2_pi/2018/06/06/1528271145618709979.png"
                        className="payment-src"
                        alt=""
                      ></img>
                      <span className="payment-des">Credit/Debit card</span>
                    </>
                  }
                />
              </RadioGroup>
              {error.paymentMethod && (
                <div className="show-alert">
                  <Alert
                    className="animate__animated animate__shakeX"
                    severity="error"
                  >
                    Please choose a payment method
                  </Alert>
                </div>
              )}
            </FormControl>
            <TextField
              id="filled-basic-card-number"
              label="Card number"
              fullWidth
              margin="dense"
              name="cardNumber"
              value={value.cardNumber}
              disabled={disabled}
              inputProps={{
                minLength: 9,
                maxLength: 19,
              }}
              onChange={handleChangePaymentMethod}
              required={!disabled}
            />
            <h6 style={{ marginTop: 20, opacity: disabled ? 0.5 : 1 }}>
              Expiration date
            </h6>
            <div>
              <FormControl
                className={classes.formControlSelected}
                disabled={disabled}
                required={!disabled}
              >
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month-select-required"
                  value={date.month}
                  name="month"
                  onChange={handleChangeSelected}
                  className={classes.selectEmpty}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                className={classes.formControlSelected}
                style={{ marginLeft: 50 }}
                disabled={disabled}
                required={!disabled}
              >
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year-select-required"
                  value={date.year}
                  name="year"
                  onChange={handleChangeSelected}
                  className={classes.selectEmpty}
                >
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="container-button-payment">
          <button onClick={handleBack}>Back</button>
          <button type="submit">Payment</button>
        </div>
      </form>
      <CartSlider />
    </div>
  );
};

export default CartOrder;
