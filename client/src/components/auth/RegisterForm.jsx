import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
  },
}));

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showPasswordConfirm: false,
  });

  const classes = useStyles();

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const setTypeAlert = (message) => {
    setAlert({ message });
    setTimeout(() => setAlert(null), 5000);
  };

  const register = async (event) => {
    event.preventDefault();

    if (username !== "" && username.length < 8) {
      setTypeAlert("Username must be 8 characters or more");
      return;
    }

    if (password !== "" && password.length < 8) {
      setTypeAlert("Password must be 8 characters or more");
      return;
    }

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setTypeAlert("Passwords do not match");
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) setTypeAlert(registerData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setRegisterForm({
      ...registerForm,
      showPassword: !registerForm.showPassword,
    });
  };

  const handleClickShowPasswordConfirm = () => {
    setRegisterForm({
      ...registerForm,
      showPasswordConfirm: !registerForm.showPasswordConfirm,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container-login animate__animated animate__fadeIn">
      <form className="login-form" onSubmit={register}>
        <h1>Register</h1>
        <TextField
          id="filled-basic-username"
          label="User name"
          autoComplete="off"
          fullWidth
          margin="dense"
          name="username"
          value={username}
          onChange={onChangeRegisterForm}
        />
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="filled-basic-password"
            type={registerForm.showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  style={{ color: "white" }}
                >
                  {registerForm.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password confirm
          </InputLabel>
          <Input
            id="filled-basic-password-confirm"
            type={registerForm.showPasswordConfirm ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  onMouseDown={handleMouseDownPassword}
                  style={{ color: "white" }}
                >
                  {registerForm.showPasswordConfirm ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {alert && (
          <div className="show-alert">
            <Alert
              className="animate__animated animate__shakeX"
              severity="error"
            >
              {alert.message}
            </Alert>
          </div>
        )}
        <button className="button-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have account?&nbsp;
        <Link to="/login">Login now</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
