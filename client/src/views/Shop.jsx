import { useContext, useState, useEffect, useRef } from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import ProductModal from "../components/product/ProductModal";
import Footer from "../components/layout/Footer";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import "../css/Shop.css";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";

const Shop = () => {
  const [type, setType] = useState("");
  const [animate, setAnimate] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [page, setPage] = useState(1);

  const { showToastCart } = useContext(CartContext);
  const {
    productState: { allProducts },
    getAllProducts,
  } = useContext(ProductContext);

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
          <Card
            style={{
              width: "18rem",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
            onClick={() => {
              document.getElementById("myModal").style.display = "block";
              setUrlImg(product);
            }}
          >
            <div className="block-pic">
              <Card.Img variant="top" src={product.url} />
              <Link to="#">Quick View</Link>
            </div>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const handle = () => {
    setAnimate("animate__animated animate__zoomIn");
  };

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
          />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showToastCart}
        message={
          <div className="toast-cart">
            <CheckIcon
              style={{ color: "green", paddingRight: 2 }}
              fontSize="medium"
            />
            Added to cart
          </div>
        }
      />
      <ProductModal _id={urlImg._id} product={urlImg} />
    </div>
  );
};

export default Shop;
