import { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Tooltip } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

import FilterListIcon from "@material-ui/icons/FilterList";
import CardProduct from "./CardProduct";
import Zoom from "@material-ui/core/Zoom";
import Filter from "./Filter";

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "#333",
    width: 700,
    maxWidth: "unset",
  },
  popperArrow: {
    marginTop: 5,
  },
  arrow: { color: "#333" },
});

const ShowProduct = (props) => {
  const { setUrlImg } = props;
  const classes = useStyles();
  const classesStyle = {
    tooltip: classes.tooltip,
    popperArrow: classes.popperArrow,
    arrow: classes.arrow,
  };
  const {
    productState: { allProducts },
  } = useContext(ProductContext);

  // const [type, setType] = useState("");
  const [animate, setAnimate] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // const products = allProducts.filter((item) => item.type === type);

  let result = allProducts;
  // if (type !== "") result = products;

  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(data.length / perPage);
  console.log(data);
  useEffect(() => setData(allProducts), [allProducts]);
  let bodyDefault = (
    <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-5">
      {data.slice(start, end).map((product) => (
        <Col key={product._id} className={"my-2 " + animate}>
          <CardProduct product={product} setUrlImg={setUrlImg} />
        </Col>
      ))}
    </Row>
  );

  const handle = () => {
    setAnimate("animate__animated animate__zoomIn");
    return setTimeout(() => setAnimate(""), 100);
  };

  const handleChangePage = (event, value) => setPage(value);

  return (
    <div className="shop-container">
      <div
        className="d-flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Tooltip
          title={<Filter handle={handle} data={data} setData={setData} />}
          placement="right"
          classes={classesStyle}
          interactive
          arrow
          open={open}
          TransitionComponent={Zoom}
        >
          <FilterListIcon fontSize="large" />
        </Tooltip>

        {/* <div>
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
        </div> */}
      </div>
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
    </div>
  );
};

export default ShowProduct;
