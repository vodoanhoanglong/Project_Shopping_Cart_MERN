import React from "react";

import ShowToast from "../layout/ShowToast";
import ProductModal from "../product/ProductModal";

import { Card, Row, Col } from "react-bootstrap";
import { FavoritesContext } from "../../contexts/FavoritesContext";

import "../../css/Favorites.css";

const Favorites = () => {
  const [animate, setAnimate] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [view, setView] = React.useState("");

  const {
    favoritesState: { favorites },
    getFavorites,
    deleteFavorites,
  } = React.useContext(FavoritesContext);

  React.useEffect(() => getFavorites(), [showToast]);

  const handleHover = () => setAnimate("animate__animated animate__zoomIn");

  const handleClick = (event, product) => {
    setView(product);
    document.getElementById("myModal").style.display = "block";
  };

  const handleDelete = async (event, productId) => {
    try {
      await deleteFavorites(productId);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="favorites animate__animated animate__fadeIn">
      <h1>My Favorites</h1>
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-5">
        {favorites.map((item) => (
          <Col key={item.product._id}>
            <Card
              style={{
                width: "16rem",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <div className="block-pic" onMouseEnter={handleHover}>
                <Card.Img variant="top" src={item.product.url} />
                <button
                  style={{ bottom: "18%" }}
                  className={"btn-favorites " + animate}
                  onClick={(e) => handleClick(e, item.product)}
                >
                  View
                </button>
                <button
                  style={{ bottom: "2%" }}
                  className={"btn-favorites " + animate}
                  onClick={(e) => handleDelete(e, item.product._id)}
                >
                  Delete
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <ShowToast title="Deleted success" showToast={showToast} />
      <ProductModal _id={view._id} product={view} />
    </div>
  );
};

export default Favorites;
