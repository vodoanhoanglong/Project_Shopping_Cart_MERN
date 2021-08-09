import { useContext, useState, useEffect, useRef } from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import { ProductContext } from "../contexts/ProductContext";

import { Row, Col, Card } from "react-bootstrap";
import "../css/Shop.css";
import { Link } from "react-router-dom";
import ProductModal from "../components/product/ProductModal";

const Shop = () => {
  const [type, setType] = useState("");
  const [animate, setAnimate] = useState("");
  const [urlImg, setUrlImg] = useState("");

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

  let bodyDefault = (
    <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-5">
      {result.map((product) => (
        <Col key={product._id} className={"my-2 " + animate}>
          <Card
            style={{ width: "19rem" }}
            onClick={() => {
              document.getElementById("myModal").style.display = "block";
              setUrlImg(product.url);
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

  return (
    <div className="animate__animated animate__fadeIn">
      <NavbarMenu />
      <div className="shop-container">
        <div className="d-flex">
          <div>
            <button
              autoFocus
              onClick={() => {
                setType("");
                setAnimate("animate__animated animate__fadeIn");
              }}
            >
              All product
            </button>
            <button
              onClick={() => {
                setType("Women");
                handle();
              }}
            >
              Women
            </button>
            <button
              onClick={() => {
                setType("Men");
                handle();
              }}
            >
              Men
            </button>
            <button
              onClick={() => {
                setType("Shoes");
                handle();
              }}
            >
              Shoes
            </button>
            <button
              onClick={() => {
                setType("Watches");
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
        <div className="products">{bodyDefault}</div>
      </div>
      <ProductModal url={urlImg} />
    </div>
  );
};

export default Shop;
