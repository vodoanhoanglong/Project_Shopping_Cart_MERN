import React from "react";
import Address from "../components/contact/Address";
import Information from "../components/contact/Information";
import ContactForm from "../components/contact/ContactForm";
import NavbarMenu from "../components/layout/NavbarMenu";
import Footer from "../components/layout/Footer";
import AOS from "aos";

import "../css/Contact.css";
import LineChart from "../components/contact/LineChart";

const Contact = () => {
  React.useEffect(() => AOS.init({}), []);
  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <Information />
      <Address />
      <div style={{ marginBottom: 150 }}></div>
      <LineChart />
      <div style={{ marginBottom: 150 }}></div>
      <ContactForm />
      <div style={{ marginBottom: 150 }}></div>
      <Footer />
    </div>
  );
};

export default Contact;
