import React, { useState } from "react";

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

import "../../css/CartPayment.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CartPayment = () => {
  const [length, setLength] = useState({
    fullName: 0,
    phone: 0,
    address: 0,
  });
  const [icon, setIcon] = useState({
    fullName: false,
    phone: false,
    address: false,
  });
  const [error, setError] = useState({
    couponCode: false,
    paymentMethod: false,
  });
  const [valueRadio, setValueRadio] = useState("");
  const [valueCardNumber, setValueCardNumber] = useState("");
  const [disabled, setDisabled] = useState(true);

  const classes = useStyles();

  const regexFullName = /^[^0-9\b]{2,40}$/;
  const regexPhone = /^[0][0-9\b]+$/;
  const regexAddress = /[A-Za-z0-9'\.\-\s\,]{30,120}$/;

  const handleChange = (regex) => (e) => {
    const inputName = e.target.name;
    const inputLength = e.target.value.length;
    const inputValue = e.target.value;
    setLength((prevLength) => ({
      ...prevLength,
      [inputName]: inputLength,
    }));
    if (!regex.test(inputValue) || inputValue === "")
      setIcon((prevIcon) => ({ ...prevIcon, [inputName]: false }));
    else setIcon((prevIcon) => ({ ...prevIcon, [inputName]: true }));
  };

  const handleChangePaymentMethod = (e) =>
    !/^[0-9]*$/.test(e.target.value)
      ? null
      : setValueCardNumber(e.target.value);

  const handleRadioChange = (e) => {
    if (e.target.value === "online") setDisabled(false);
    else setDisabled(true);
    setValueRadio(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const couponCode = document.getElementById("filled-basic-coupon").value;
    if (couponCode !== "HOANGLONGDEPZAIVCL" && couponCode !== "")
      setError((prevError) => ({ ...prevError, couponCode: true }));
    else setError((prevError) => ({ ...prevError, couponCode: false }));
    if (valueRadio === "offline")
      setError((prevError) => ({ ...prevError, paymentMethod: false }));
    else if (valueRadio === "online")
      setError((prevError) => ({ ...prevError, paymentMethod: false }));
    else setError((prevError) => ({ ...prevError, paymentMethod: true }));
  };

  return (
    <div className="animate__animated animate__fadeIn">
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
              inputProps={{
                minLength: 6,
              }}
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
                name="quiz"
                value={valueRadio}
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
              value={valueCardNumber}
              disabled={disabled}
              inputProps={{
                minLength: 9,
                maxLength: 19,
              }}
              onChange={handleChangePaymentMethod}
              required
            />
            <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={10}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
        <div className="container-button-payment">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CartPayment;
