import React from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { ProductContext } from "../../contexts/ProductContext";

import ShowToast from "../layout/ShowToast";
import DialogCard from "./DialogCard";

const CardProduct = (props) => {
  const { product, setUrlImg } = props;

  const [animate, setAnimate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState({
    added: false,
    deleted: false,
  });
  const [colorFavorites, setColorFavorites] = React.useState(null);

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { addFavorites, deleteFavorites, checkFavoritesProduct } =
    React.useContext(FavoritesContext);
  const { setOpenDialog } = React.useContext(ProductContext);

  const changeColorHeart = async () => {
    try {
      const resultItem = await checkFavoritesProduct(product._id);
      if (resultItem.success) setColorFavorites({ color: "#717fe0" });
      else setColorFavorites(null);
    } catch (error) {
      console.log(error);
    }
  };

  const changeShowToast = (type) => {
    if (type === "added") setAnimate("animate__animated animate__heartBeat");
    else setAnimate("");
    setShowToast((prevState) => ({ ...prevState, [type]: true }));
    setTimeout(() => {
      setShowToast((prevState) => ({ ...prevState, [type]: false }));
    }, 3000);
  };

  const handleFavoritesList = async () => {
    if (!isAuthenticated) return setOpen(true);
    try {
      const result = await checkFavoritesProduct(product._id);
      if (result.success) {
        await deleteFavorites(product._id);
        setColorFavorites(null);
        changeShowToast("deleted");
      } else {
        await addFavorites(product._id);
        setColorFavorites({ color: "#717fe0" });
        changeShowToast("added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setOpenDialog(true);
    setUrlImg(product);
  };

  React.useEffect(() => {
    if (isAuthenticated) changeColorHeart();
    else setColorFavorites(null);
  }, [isAuthenticated]);

  return (
    <div>
      <Card
        style={{
          width: "18rem",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        {product.discount !== 0 && (
          <div className="label-discount">
            <b>-{product.discount}%</b>
          </div>
        )}
        <div className="block-pic">
          <Card.Img variant="top" src={product.url} />
          <button to="#" onClick={handleClick}>
            Quick View
          </button>
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <div className="icon-heart">
            <div style={{ display: "flex" }}>
              <Card.Text
                style={
                  product.discount !== 0
                    ? {
                        textDecorationLine: "line-through",
                        opacity: 0.6,
                      }
                    : null
                }
              >
                {"$ " + product.price}
              </Card.Text>
              {product.discount !== 0 && (
                <Card.Text className="discount-text">
                  {"$ " +
                    (
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(2)}
                </Card.Text>
              )}
            </div>
            <i
              className={"fas fa-heart " + animate}
              style={colorFavorites}
              onClick={handleFavoritesList}
            ></i>
          </div>
        </Card.Body>
      </Card>
      <DialogCard open={open} setOpen={setOpen} />
      <ShowToast title="Added favorites" showToast={showToast.added} />
      <ShowToast title="Deleted favorites" showToast={showToast.deleted} />
    </div>
  );
};

export default CardProduct;
