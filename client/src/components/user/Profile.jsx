import React from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";

import "../../css/Profile.css";
import ShowToast from "../layout/ShowToast";

const couponCode = { name: "LOVEYOUSOMUCH", discount: 10 };

const useStyles = makeStyles((theme) => ({
  formControlSelected: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Profile = () => {
  const {
    authState: { user },
    loadUser,
  } = React.useContext(AuthContext);

  const [showToastCoupon, setShowToastCoupon] = React.useState(false);

  const { saveInformationUser } = React.useContext(UserContext);

  const [active, setActive] = React.useState(!user.fullName ? "add" : "edit");
  const [disabled, setDisabled] = React.useState(true);

  const [value, setValue] = React.useState(
    user.fullName
      ? {
          fullName: user.fullName,
          phone: user.phone,
          address: user.address,
        }
      : {
          fullName: "",
          phone: "",
          address: "",
        }
  );
  const [length, setLength] = React.useState(
    user.fullName
      ? {
          fullName: user.fullName.length,
          phone: user.phone.length,
          address: user.address.length,
        }
      : {
          fullName: 0,
          phone: 0,
          address: 0,
        }
  );
  const [icon, setIcon] = React.useState(
    user.fullName
      ? {
          fullName: true,
          phone: true,
          address: true,
        }
      : {
          fullName: false,
          phone: false,
          address: false,
        }
  );
  const [gender, setGender] = React.useState(!user.gender ? "" : user.gender);
  const [selectedDate, setSelectedDate] = React.useState(
    !user.dateOfBirth ? null : new Date(user.dateOfBirth)
  );

  const classes = useStyles();

  const saveUser = async (e) => {
    e.preventDefault();
    if (!selectedDate.getTime()) return;
    const userForm = {
      _id: user._id,
      fullName: value.fullName,
      phone: value.phone,
      address: value.address,
      gender,
      dateOfBirth: selectedDate,
    };
    const addCouponCode = {
      _id: user._id,
      couponCode,
    };

    try {
      await saveInformationUser(userForm);
      if (active === "add") {
        await saveInformationUser(addCouponCode);
        setShowToastCoupon(true);
        setTimeout(() => setShowToastCoupon(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setActive("edit");
  };

  const handleDateChange = (date) => setSelectedDate(date);

  const handleChangeSelected = (e) => setGender(e.target.value);

  const handleClickEdit = () => setActive("update-cancel");
  const handleClickCancel = () => setActive("edit");

  const regexFullName = /^[^0-9\b]{2,40}$/;
  const regexPhone = /^[0][0-9\b]{9,11}$/;
  const regexAddress = /[A-Za-z0-9'\.\-\s\,]{30,120}$/;

  const checkUpdate = () =>
    !selectedDate || !selectedDate.getTime()
      ? setDisabled(true)
      : value.fullName === user.fullName &&
        value.phone === user.phone &&
        value.address === user.address &&
        gender === user.gender &&
        new Date(selectedDate).toLocaleDateString("vi-VN") ===
          new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
      ? setDisabled(true)
      : setDisabled(false);

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

  React.useEffect(() => {
    if (active === "edit") loadUser();
    if (active === "update-cancel") checkUpdate();
  }, [active, value, gender, selectedDate]);

  return (
    <div className="profile animate__animated animate__fadeIn">
      <h1>My Profile</h1>
      {active === "add" || active === "update-cancel" ? (
        <form onSubmit={saveUser}>
          {active === "add" && (
            <h2>
              Enter your information to receive a 10% discount code for your
              order
            </h2>
          )}
          <div className="input-user">
            <TextField
              id="full-name"
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
          <div className="input-user">
            <TextField
              id="phone"
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
          <div className="input-user">
            <TextField
              id="address"
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
          <div className="select-user">
            <FormControl
              className={classes.formControlSelected}
              style={{ marginTop: 6.5 }}
              required
            >
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select-required"
                value={gender}
                name="gender"
                onChange={handleChangeSelected}
                className={classes.selectEmpty}
              >
                <MenuItem value="Man">Man</MenuItem>
                <MenuItem value="Woman">Woman</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of birth"
                  required
                  invalidDateMessage="Invalid Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          {active === "update-cancel" && (
            <Button
              className="btn-user"
              onClick={handleClickCancel}
              style={{ marginRight: 30 }}
            >
              Cancel
            </Button>
          )}
          <Button
            className="btn-user"
            type="submit"
            disabled={active === "update-cancel" && disabled}
          >
            {active === "update-cancel" ? "Update" : "Save"}
          </Button>
        </form>
      ) : (
        <div className="information-user">
          <div style={{ width: "100vh" }}>
            <h4>
              <b>Full name:</b> {user.fullName}
            </h4>
            <h4>
              <b>Phone:</b> {user.phone}
            </h4>
            <h4>
              <b>Gender:</b> {user.gender}
            </h4>
            <h4>
              <b>Date of birth:</b>&nbsp;
              {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
            </h4>
            <h4>
              <b>Address:</b> {user.address}
            </h4>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button className="btn-user" onClick={handleClickEdit}>
              Edit
            </Button>
          </div>
        </div>
      )}
      <ShowToast title="Received a coupon CODE" showToast={showToastCoupon} />
    </div>
  );
};

export default Profile;
