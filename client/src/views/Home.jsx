import React from "react";
import Footer from "../components/layout/Footer";
import MultiItemCarousel from "../components/slide/MultiItemCarousel";
import NavbarMenu from "../components/layout/NavbarMenu";
import { SlideBar } from "../components/slide/SlideBar";
import { UserContext } from "../contexts/UserContext";
import ShowToast from "../components/layout/ShowToast";
import { ProductContext } from "../contexts/ProductContext";
import ProductModal from "../components/product/ProductModal";

import "../css/Home.css";

const Home = () => {
  const { toastLogoutUser } = React.useContext(UserContext);
  const [info, setInfo] = React.useState("");

  const {
    productState: { products, productFavorites, productDiscount },
    get12ProductsFavorites,
    get12ProductsDiscount,
    setOpenDialog,
  } = React.useContext(ProductContext);

  React.useEffect(() => {
    get12ProductsFavorites();
    get12ProductsDiscount();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <SlideBar />
      <div>
        <h2 className="title-slider">New Products</h2>
      </div>
      <MultiItemCarousel
        type="new"
        setOpenDialog={setOpenDialog}
        setInfo={setInfo}
        data={products}
      />
      <div>
        <h2 className="title-slider">Products with the most likes</h2>
      </div>
      <MultiItemCarousel
        type="favorites"
        setOpenDialog={setOpenDialog}
        setInfo={setInfo}
        data={productFavorites.map((item) => item.product)}
        label={productFavorites}
      />
      <div>
        <h2 className="title-slider">Products are on sale</h2>
      </div>
      <MultiItemCarousel
        type="discount"
        setOpenDialog={setOpenDialog}
        setInfo={setInfo}
        data={productDiscount}
      />
      <ProductModal _id={info._id} product={info} />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <Footer />
    </div>
  );
};

export default Home;
