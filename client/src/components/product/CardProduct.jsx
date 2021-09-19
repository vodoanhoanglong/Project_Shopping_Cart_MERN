import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import DialogCard from "./DialogCard";

const CardProduct = (props) => {
  const { product, setUrlImg } = props;

  const [open, setOpen] = React.useState(false);
  const [colorFavorites, setColorFavorites] = React.useState(null);

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { addFavorites, deleteFavorites, checkFavoritesProduct } =
    React.useContext(FavoritesContext);

  const changeColorHeart = async () => {
    try {
      const resultItem = await checkFavoritesProduct(product._id);
      if (resultItem.success) setColorFavorites({ color: "#717fe0" });
      else setColorFavorites(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritesList = async () => {
    if (!isAuthenticated) return setOpen(true);
    try {
      const result = await checkFavoritesProduct(product._id);
      if (result.success) {
        await deleteFavorites(product._id);
        setColorFavorites(null);
      } else {
        await addFavorites(product._id);
        setColorFavorites({ color: "#717fe0" });
      }
    } catch (error) {
      console.log(error);
    }
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
        <div className="block-pic">
          <Card.Img variant="top" src={product.url} />
          <Link
            to="#"
            onClick={() => {
              document.getElementById("myModal").style.display = "block";
              setUrlImg(product);
            }}
          >
            Quick View
          </Link>
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <div className="icon-heart">
            <Card.Text>${product.price}</Card.Text>
            <i
              className="fas fa-heart"
              style={colorFavorites}
              onClick={handleFavoritesList}
            ></i>
          </div>
        </Card.Body>
      </Card>
      <DialogCard open={open} setOpen={setOpen} />
    </div>
  );
};

export default CardProduct;
