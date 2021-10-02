import React from "react";
import ShowProduct from "../product/ShowProduct";

const Product = () => {
  const [infoProduct, setInfoProduct] = React.useState("");
  return (
    <div>
      <ShowProduct setUrlImg={setInfoProduct} />
    </div>
  );
};

export default Product;
