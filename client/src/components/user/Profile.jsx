import React from "react";

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
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";

import "../../css/Profile.css";

const useStyles = makeStyles((theme) => ({
  formControlSelected: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Profile = () => {
  const [value, setValue] = React.useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [length, setLength] = React.useState({
    fullName: 0,
    phone: 0,
    address: 0,
  });
  const [icon, setIcon] = React.useState({
    fullName: false,
    phone: false,
    address: false,
  });
  const [gender, setGender] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2001-03-03T21:11:54")
  );

  const classes = useStyles();

  const handleDateChange = (date) => setSelectedDate(date);

  const handleChangeSelected = (e) => setGender(e.target.value);

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
    setValue((prevValue) => ({ ...prevValue, [inputName]: inputValue }));
    if (!regex.test(inputValue) || inputValue === "")
      setIcon((prevIcon) => ({ ...prevIcon, [inputName]: false }));
    else setIcon((prevIcon) => ({ ...prevIcon, [inputName]: true }));
  };
  return (
    <div className="profile animate__animated animate__fadeIn">
      <h1>My Profile</h1>
      <form>
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
              <MenuItem value="Man">Woman</MenuItem>
              <MenuItem value="Man">Other</MenuItem>
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
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <button className="btn-user">Save</button>
      </form>
    </div>
  );
};

export default Profile;
