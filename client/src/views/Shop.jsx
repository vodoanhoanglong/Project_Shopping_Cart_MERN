import { useContext, useEffect, useRef } from "react";

import NavbarMenu from "../components/layout/NavbarMenu";
import { ProductContext } from "../contexts/ProductContext";

import { Row, Col, Card } from "react-bootstrap";
import "../css/Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
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

  const showProducts = (type) => {};

  return (
    <div>
      <NavbarMenu />
      <div className="shop-container">
        <div className="d-flex">
          <div>
            <button>All product</button>
            <button>Women</button>
            <button>Men</button>
            <button>Shoes</button>
            <button>Watches</button>
          </div>
          <div>
            <button>Filter</button>
          </div>
        </div>
        <div className="products">
          <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-5">
            {allProducts.map((product) => (
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
