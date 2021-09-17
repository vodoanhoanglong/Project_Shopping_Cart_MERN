import React from "react";
import Footer from "../components/layout/Footer";
import MultiItemCarousel from "../components/slide/MultiItemCarousel";
import NavbarMenu from "../components/layout/NavbarMenu";
import { SlideBar } from "../components/slide/SlideBar";
import { UserContext } from "../contexts/UserContext";
import ShowToast from "../components/layout/ShowToast";

const Home = () => {
  const { toastLogoutUser } = React.useContext(UserContext);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <SlideBar />
      <div>
        <h2
          style={{
            paddingLeft: "290px",
            marginTop: "50px",
            fontFamily: "PlayfairDisplay-Bold",
            fontWeight: "bold",
            fontSize: "40px",
            color: "black",
            textTransform: "uppercase",
          }}
        >
          New Products
        </h2>
      </div>
      <MultiItemCarousel />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <Footer />
    </div>
  );
};

export default Home;
