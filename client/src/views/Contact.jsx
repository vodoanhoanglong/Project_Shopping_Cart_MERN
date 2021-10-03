import React from "react";
import Information from "../components/contact/Information";
import NavbarMenu from "../components/layout/NavbarMenu";

import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <Information />
    </div>
  );
};

export default Contact;
