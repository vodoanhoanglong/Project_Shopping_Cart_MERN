import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="NavbarMenu">
      <Navbar.Brand className="font-weight-bolder text-black">
        HoangLong's Store
      </Navbar.Brand>
      <Navbar.Toggle arial-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-black"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-black"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-black" disabled>
            Welcome Long
          </Nav.Link>
          <Button>Hi</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
