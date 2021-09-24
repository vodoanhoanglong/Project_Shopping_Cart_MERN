import { useContext, useState, useEffect, useRef } from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import ProductModal from "../components/product/ProductModal";
import Footer from "../components/layout/Footer";
import { ProductContext } from "../contexts/ProductContext";

import { Row, Col } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

import "../css/Shop.css";
import ShowToast from "../components/layout/ShowToast";
import CardProduct from "../components/product/CardProduct";

const Shop = () => {
  const [type, setType] = useState("");
  const [animate, setAnimate] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [page, setPage] = useState(1);

  const {
    productState: { allProducts },
    getAllProducts,
  } = useContext(ProductContext);

  const { showToastCart } = useContext(CartContext);
  const { toastLogoutUser } = useContext(UserContext);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    getAllProducts();
    return () => (isMounted.current = false);
  }, []);

  const products = allProducts.filter((item) => item.type === type);

  let result = allProducts;
  if (type !== "") result = products;

  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(result.length / perPage);

  let bodyDefault = (
    <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-5">
      {result.slice(start, end).map((product) => (
        <Col key={product._id} className={"my-2 " + animate}>
          <CardProduct product={product} setUrlImg={setUrlImg} />
        </Col>
      ))}
    </Row>
  );

  const handle = () => setAnimate("animate__animated animate__zoomIn");

  const handleChangePage = (event, value) => setPage(value);

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <div className="shop-container">
        <div className="d-flex">
          <div>
            <button
              className={type === "" ? "button-focus" : ""}
              onClick={() => {
                setType("");
                setPage(1);
                setAnimate("animate__animated animate__fadeIn");
              }}
            >
              All product
            </button>
            <button
              className={type === "Women" ? "button-focus" : ""}
              onClick={() => {
                setType("Women");
                setPage(1);
                handle();
              }}
            >
              Women
            </button>
            <button
              className={type === "Men" ? "button-focus" : ""}
              onClick={() => {
                setType("Men");
                setPage(1);
                handle();
              }}
            >
              Men
            </button>
            <button
              className={type === "Shoes" ? "button-focus" : ""}
              onClick={() => {
                setType("Shoes");
                setPage(1);
                handle();
              }}
            >
              Shoes
            </button>
            <button
              className={type === "Watches" ? "button-focus" : ""}
              onClick={() => {
                setType("Watches");
                setPage(1);
                handle();
              }}
            >
              Watches
            </button>
          </div>
          <div>
            <button>Filter</button>
          </div>
        </div>
        <div className="products">
          {bodyDefault}
          <Pagination
            count={totalPage}
            size="large"
            page={page}
            onChange={handleChangePage}
            onClick={handle}
          />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
      <ShowToast title="Added to cart" showToast={showToastCart} />
      <ShowToast title="Logout success" showToast={toastLogoutUser} />
      <ProductModal _id={urlImg._id} product={urlImg} />
    </div>
  );
};

export default Shop;
