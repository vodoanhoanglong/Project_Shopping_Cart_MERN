import React from "react";
import Footer from "../components/layout/Footer";
import MultiItemCarousel from "../components/slide/MultiItemCarousel";
import NavbarMenu from "../components/layout/NavbarMenu";
import { SlideBar } from "../components/slide/SlideBar";
import { UserContext } from "../contexts/UserContext";
import ShowToast from "../components/layout/ShowToast";
import { ProductContext } from "../contexts/ProductContext";
import ProductModal from "../components/product/ProductModal";
import AOS from "aos";

import "../css/Home.css";

const Home = () => {
  const { toastLogoutUser } = React.useContext(UserContext);
  const [info, setInfo] = React.useState("");

  const {
    productState: { products, productFavorites, productDiscount },
    get12ProductsFavorites,
    get12ProductsDiscount,
  } = React.useContext(ProductContext);

  React.useEffect(() => {
    get12ProductsFavorites();
    get12ProductsDiscount();
    AOS.init({});
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <SlideBar />
      <div data-aos="fade-down" data-aos-duration="1500">
        <h2 className="title-slider">New Products</h2>
      </div>
      <MultiItemCarousel type="new" setInfo={setInfo} data={products} />
      <div data-aos="fade-down" data-aos-duration="1500">
        <h2 className="title-slider">Products with the most likes</h2>
      </div>
      <MultiItemCarousel
        type="favorites"
        setInfo={setInfo}
        data={productFavorites.map((item) => item.product)}
        label={productFavorites}
      />
      <div data-aos="fade-down" data-aos-duration="1500">
        <h2 className="title-slider">Products are on sale</h2>
      </div>
      <MultiItemCarousel
        type="discount"
        setInfo={setInfo}
        data={productDiscount}
      />
      <div style={{ marginBottom: 200 }}></div>
      <ProductModal _id={info._id} product={info} />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <Footer />
    </div>
  );
};

export default Home;
