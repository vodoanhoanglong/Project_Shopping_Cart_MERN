import Footer from "../components/layout/Footer";
import MultiItemCarousel from "../components/slide/MultiItemCarousel";
import NavbarMenu from "../components/layout/NavbarMenu";
import { SlideBar } from "../components/slide/SlideBar";

const Home = () => {
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

      <Footer />
    </div>
  );
};

export default Home;
