import React from "react";
import Product from "../components/dashboard/Product";
import NavbarMenu from "../components/layout/NavbarMenu";

const Dashboard = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <Product />
    </div>
  );
};

export default Dashboard;
