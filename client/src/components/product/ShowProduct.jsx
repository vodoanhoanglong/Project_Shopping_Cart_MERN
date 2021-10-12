import { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Tooltip } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

import FilterListIcon from "@material-ui/icons/FilterList";
import CardProduct from "./CardProduct";
import Zoom from "@material-ui/core/Zoom";

import Cry from "../../assets/cry.png";
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

  const [animate, setAnimate] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState([]);
  const [price, setPrice] = useState([0, 3000]);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("");

  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(data.length / perPage);

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
    setTimeout(() => setAnimate(""), 1000);
  };

  const handleChangePage = (event, valuePage) => setPage(valuePage);

  return (
    <div className="shop-container">
      <div
        className="d-flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Tooltip
          title={
            <Filter
              handle={handle}
              setData={setData}
              type={type}
              setType={setType}
              selected={selected}
              setSelected={setSelected}
              expanded={expanded}
              setExpanded={setExpanded}
              price={price}
              setPrice={setPrice}
              value={value}
              setValue={setValue}
              currData={allProducts}
            />
          }
          placement="right"
          classes={classesStyle}
          interactive
          arrow
          open={open}
          TransitionComponent={Zoom}
        >
          <FilterListIcon fontSize="large" />
        </Tooltip>
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
