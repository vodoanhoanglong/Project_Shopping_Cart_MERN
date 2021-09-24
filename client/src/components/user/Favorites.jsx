import React from "react";

import ShowToast from "../layout/ShowToast";
import ProductModal from "../product/ProductModal";

import { CartContext } from "../../contexts/CartContext";
import { Card, Row, Col } from "react-bootstrap";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { ProductContext } from "../../contexts/ProductContext";
import { Pagination } from "@material-ui/lab";

import FavoritesEmpty from "../../assets/empty-favorites.png";
import "../../css/Favorites.css";

const Favorites = () => {
  const [animate, setAnimate] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [view, setView] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { showToastCart } = React.useContext(CartContext);
  const {
    favoritesState: { favorites },
    getFavorites,
    deleteFavorites,
  } = React.useContext(FavoritesContext);
  const { setOpenDialog } = React.useContext(ProductContext);
  React.useEffect(() => getFavorites(), [showToast]);

  const handleHover = () => setAnimate("animate__animated animate__zoomIn");

  const handleClick = (event, product) => {
    setView(product);
    // document.getElementById("myModal").style.display = "block";
    setOpenDialog(true);
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

  const perPage = 9;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(favorites.length / perPage);

  const handleChangePageDeleted = () =>
    page > totalPage ? setPage(totalPage) : null;

  const handleChangePage = (event, value) => setPage(value);

  if (favorites.length !== 0 && favorites.length % perPage === 0)
    handleChangePageDeleted();

  return (
    <div className="favorites animate__animated animate__fadeIn">
      <h1>My Favorites</h1>
      {totalPage > 0 ? (
        <>
          <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-5">
            {favorites.slice(start, end).map((item) => (
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
          <Pagination
            count={totalPage}
            size="large"
            page={page}
            onChange={handleChangePage}
          />
          <ShowToast title="Deleted success" showToast={showToast} />
          <ShowToast title="Added to cart" showToast={showToastCart} />
          <ProductModal _id={view._id} product={view} />
        </>
      ) : (
        <div className="empty-order">
          <img
            src={FavoritesEmpty}
            alt=""
            style={{ width: 180, height: 180 }}
          />
          <h1>You don't have any favorites</h1>
        </div>
      )}
    </div>
  );
};

export default Favorites;
