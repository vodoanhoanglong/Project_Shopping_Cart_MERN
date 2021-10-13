import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CheckIcon from "@material-ui/icons/Check";

import { CartContext } from "../../contexts/CartContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactForm = () => {
  const [value, setValue] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);

  const { addContact } = React.useContext(CartContext);

  const saveContact = async (e) => {
    e.preventDefault();

    const info = {
      fullName: value.fullName,
      email: value.email,
      phone: value.phone,
      message: value.message,
    };
    try {
      await addContact(info);
      setValue({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setOpen(true);
      setTimeout(() => setOpen(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [inputName]: inputValue }));
  };

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 750) setState(true);
    else setState(false);
  });

  const checkAnimate = (string) => (state ? string : "");

  return (
    <div className="contact-form">
      <h1 className={checkAnimate("animate__animated animate__fadeInDown")}>
        Contact send
      </h1>
      <form
        onSubmit={saveContact}
        className={checkAnimate("animate__animated animate__fadeInUp")}
      >
        <div className="input-user">
          <TextField
            id="fullName"
            className={checkAnimate(
              "txt1 animate__animated animate__fadeInRight"
            )}
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
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div className="input-user">
          <TextField
            id="email"
            className={checkAnimate(
              "txt2 animate__animated animate__fadeInRight"
            )}
            label="Email"
            fullWidth
            margin="dense"
            name="email"
            value={value.email}
            inputProps={{
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
            }}
            required
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div className="input-user">
          <TextField
            id="phone"
            className={checkAnimate(
              "txt3 animate__animated animate__fadeInRight"
            )}
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
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div className="input-user">
          <TextField
            id="message"
            className={checkAnimate(
              "txt4 animate__animated animate__fadeInRight"
            )}
            label="Message"
            fullWidth
            margin="dense"
            name="message"
            value={value.message}
            required
            variant="filled"
            multiline
            rows={6}
            onChange={handleChange}
          />
        </div>
        <button
          className={
            "btn-user " + checkAnimate("animate__animated animate__fadeInUp")
          }
        >
          Send
        </button>
      </form>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="dialog-contact">
          <div style={{ display: "flex", alignItems: "center" }}>
            <CheckIcon
              style={{ color: "green", paddingRight: 2 }}
              fontSize="large"
            />
            <b>SEND SUCCESS</b>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default ContactForm;
