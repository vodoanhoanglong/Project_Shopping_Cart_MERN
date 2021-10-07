import React from "react";
import Footer from "../components/layout/Footer";
import MultiItemCarousel from "../components/slide/MultiItemCarousel";
import NavbarMenu from "../components/layout/NavbarMenu";
import { SlideBar } from "../components/slide/SlideBar";
import { UserContext } from "../contexts/UserContext";
import ShowToast from "../components/layout/ShowToast";
import { ProductContext } from "../contexts/ProductContext";
import ProductModal from "../components/product/ProductModal";

const Home = () => {
  const { toastLogoutUser } = React.useContext(UserContext);
  const [info, setInfo] = React.useState("");

  const {
    productState: { products, productFavorites },
    get12Products,
    get12ProductsFavorites,
    setOpenDialog,
  } = React.useContext(ProductContext);

  React.useEffect(() => {
    get12Products();
    get12ProductsFavorites();
  }, []);

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
      <MultiItemCarousel
        type="new"
        setOpenDialog={setOpenDialog}
        setInfo={setInfo}
        data={products}
      />
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
          Most Favorites Products
        </h2>
      </div>
      <MultiItemCarousel
        type="favorites"
        setOpenDialog={setOpenDialog}
        setInfo={setInfo}
        data={productFavorites.map((item) => item.product)}
        label={productFavorites}
      />
      <ProductModal _id={info._id} product={info} />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <Footer />
    </div>
  );
};

export default Home;
