import React from "react";
import Address from "../components/contact/Address";
import Information from "../components/contact/Information";
import NavbarMenu from "../components/layout/NavbarMenu";

import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <Information />
      <Address />
    </div>
  );
};

export default Contact;
