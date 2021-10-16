import { useContext, useState, useEffect } from "react";

import { Pagination } from "@material-ui/lab";
import { Row, Col } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";
import CardProduct from "./CardProduct";

import Cry from "../../assets/cry.png";
import Search from "./Search";
import { AuthContext } from "../../contexts/AuthContext";

const ShowProduct = (props) => {
  const { setUrlImg } = props;

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  const {
    productState: { allProducts },
  } = useContext(ProductContext);

  const [animate, setAnimate] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(data.length / perPage);

  useEffect(() => setData(allProducts), [allProducts]);

  let bodyDefault = (
    <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 mx-auto mt-5">
      {data.slice(start, end).map((product) => (
        <Col key={product._id} className={"my-2 " + animate}>
          <CardProduct
            product={product}
            setUrlImg={setUrlImg}
            isAuthenticated={isAuthenticated}
          />
        </Col>
      ))}
    </Row>
  );

  const handle = () => {
    setAnimate("animate__animated animate__zoomIn");
    setTimeout(() => setAnimate(""), 1000);
  };

  const handleChangePage = (event, valuePage) => setPage(valuePage);

  return (
    <div className="shop-container">
      <div className="filter">
        <Search handle={handle} data={allProducts} setData={setData} />
      </div>

      {data.length ? (
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
      ) : (
        <div className={"empty-product " + animate}>
          <img src={Cry} alt="" />
          <h3>No products found</h3>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
