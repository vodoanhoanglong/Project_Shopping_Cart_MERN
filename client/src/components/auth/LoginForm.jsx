import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
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

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const classes = useStyles();

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const handleClickShowPassword = () => {
    setLoginForm({ ...loginForm, showPassword: !loginForm.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-login animate__animated animate__fadeIn">
      <form className="login-form" onSubmit={login}>
        <h1>Login</h1>
        <TextField
          id="filled-basic-username"
          label="User name"
          autoComplete="off"
          fullWidth
          margin="dense"
          name="username"
          value={username}
          onChange={onChangeLoginForm}
        />
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="filled-basic-password"
            type={loginForm.showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  style={{ color: "white" }}
                >
                  {loginForm.showPassword ? <Visibility /> : <VisibilityOff />}
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
        <Button className="button-submit" type="submit">
          Login
        </Button>
      </form>
      <p>
        Don't have account?&nbsp;
        <Link to="/register">Register now</Link>
      </p>
    </div>
  );
};

export default LoginForm;
