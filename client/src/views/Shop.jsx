import { useContext, useState, useEffect, useRef } from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import { ProductContext } from "../contexts/ProductContext";

import { Row, Col, Card } from "react-bootstrap";
import "../css/Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const [type, setType] = useState("");

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
        <Col key={product._id} className="my-2">
          <Card style={{ width: "19rem" }}>
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

  return (
    <div>
      <NavbarMenu />
      <div className="shop-container">
        <div className="d-flex">
          <div>
            <button onClick={() => setType("")}>All product</button>
            <button onClick={() => setType("Women")}>Women</button>
            <button onClick={() => setType("Men")}>Men</button>
            <button onClick={() => setType("Shoes")}>Shoes</button>
            <button onClick={() => setType("Watches")}>Watches</button>
          </div>
          <div>
            <button>Filter</button>
          </div>
        </div>
        <div className="products">{bodyDefault}</div>
      </div>
    </div>
  );
};

export default Shop;
