import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";

import "../../css/CartPayment.css";

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

  return (
    <div className="container-cart-form animate__animated animate__fadeIn">
      <form className="form-information-user">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CartPayment;
