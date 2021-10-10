import React from "react";

import ProductModal from "../product/ProductModal";
import { Link } from "react-router-dom";
import Odometer from "react-odometerjs";

import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import { Pagination } from "@material-ui/lab";

import CartEmpty from "../../assets/empty-cart.png";
import "../../css/CartTable.css";

const InputCart = (props) => {
  const { _id, size, color, totalItem } = props;

  const { setItemCart } = React.useContext(CartContext);

  const [total, setTotal] = React.useState(totalItem);
  const [totalLeave, setTotalLeave] = React.useState();

  React.useEffect(() => {
    setItemCart((prevState) => [
      ...prevState.map((item) =>
        item._id === _id && item.size === size && item.color === color
          ? {
              ...item,
              totalItem: total,
              totalPrice: item.price * total,
            }
          : item
      ),
    ]);
  }, [total]);

  //khi size color update trùng nhau thì cập nhật lại số lượng cho cả InputCart và ProductModal
  React.useEffect(() => {
    setTotal(totalItem);
  }, [totalItem]);

  const regex = /^[0-9\b]+$/;

  const handleIncrease = () => setTotal(total + 1);

  const handleDecrease = () =>
    total === typeof String
      ? setTotal(1)
      : total <= 1
      ? setTotal(1)
      : setTotal(total - 1);

  const handleChangeInput = (e) => {
    let input = e.target.value;
    if (!regex.test(input)) return;
    setTotal(parseInt(input));
  };

  const handleLeaveInput = () =>
    document.getElementById(_id + color + size).value === ""
      ? setTotal(totalLeave)
      : null;

  const handleOnClickInput = () => {
    setTotalLeave(total);
    setTotal("");
  };
  return (
    <div className="quantity-btn-cart">
      <div
        className="decrease-btn-cart"
        onClick={handleDecrease}
        style={{ userSelect: "none" }}
      >
        -
      </div>
      <input
        id={_id + color + size}
        className="quantity-show-cart"
        value={total}
        onClick={handleOnClickInput}
        onChange={handleChangeInput}
        onBlur={handleLeaveInput}
      />
      <div
        className="increase-btn-cart"
        onClick={handleIncrease}
        style={{ userSelect: "none" }}
      >
        +
      </div>
    </div>
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Products",
  },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "totalItem", numeric: true, disablePadding: false, label: "Quantity" },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Total price",
  },
];

function EnhancedTableHead(props) {
  const {
    // classes,
    onSelectAllClick,
    // order,
    // orderBy,
    numSelected,
    rowCount,
    // onRequestSort,
  } = props;
  // const createSortHandler = (property) => (event) =>
  //   onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* {headCell.id !== "product" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                )}
              </TableSortLabel>
            ) : ( */}
            <span className="header-title">{headCell.label}</span>
            {/* )} */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: "black",
          backgroundColor: "#eeeeee",
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, itemRemoved, totalBill, handleNext } = props;

  return (
    <Toolbar
      style={{ backgroundColor: "#f7f8fa" }}
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
          style={{ fontWeight: "bold" }}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div className="cart-table-header">
          <h3>
            <b
              style={{
                fontFamily: "'Bebas Neue', cursive",
              }}
            >
              Total bill:
            </b>
            &ensp;
            <b>
              $
              <Odometer value={totalBill.toFixed(2)} />
            </b>
          </h3>
          <button onClick={handleNext}>Order</button>
        </div>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={itemRemoved}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  itemRemoved: PropTypes.func.isRequired,
  totalBill: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  selected: {
    backgroundColor: "#607d8b",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function CartTable() {
  const classes = useStyles();
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("price");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [information, setInformation] = React.useState("");

  const { itemCart, setItemCart, handleNext } = React.useContext(CartContext);
  const { setCart, setOpenDialog } = React.useContext(ProductContext);

  const perPage = 5;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.ceil(itemCart.length / perPage);

  const resultTotalPrice = itemCart.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = itemCart.map((n) => n._id + n.size + n.color);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, value) => setPage(value);

  const handleChangePageDeleted = () =>
    page > totalPage ? setPage(totalPage) : null;

  const handleDeleteItem = () => {
    const removeItemsSelected = [];
    const removeItems = itemCart.filter((item) => {
      const idItem = item._id + item.size + item.color;
      if (selected.indexOf(idItem) !== -1) removeItemsSelected.push(idItem);
      return selected.indexOf(idItem) === -1;
    });
    setSelected((prevState) =>
      prevState.filter((item) => !removeItemsSelected.includes(item))
    );
    setItemCart(removeItems);
  };

  if (itemCart.length !== 0 && itemCart.length % perPage === 0)
    handleChangePageDeleted();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyCart = (
    <>
      <div className="container-cart img">
        <img src={CartEmpty} alt="" style={{ width: 360, height: 300 }} />
        <h1>Cart is empty</h1>
        <div className="empty-cart-btn">
          <Link
            to="/shop"
            onMouseEnter={() =>
              setCart(
                itemCart.reduce((sum, { totalItem }) => sum + totalItem, 0)
              )
            }
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {itemCart.length !== 0 ? (
        <div className={classes.root + " cart-table"}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              itemRemoved={handleDeleteItem}
              totalBill={resultTotalPrice}
              handleNext={handleNext}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  // order={order}
                  // orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  // onRequestSort={handleRequestSort}
                  rowCount={itemCart.length}
                />
                <TableBody>
                  {
                    // stableSort(itemCart, getComparator(order, orderBy))
                    itemCart.slice(start, end).map((row, index) => {
                      const idItem = row._id + row.size + row.color;
                      const isItemSelected = isSelected(idItem);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => handleClick(event, idItem)}
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <div
                              style={{
                                display: "flex",
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              <img
                                src={row.url[row.imgIndex].img[0]}
                                alt=""
                                style={{ width: 100, height: 130 }}
                              />
                              <div className="product-info-table">
                                <h4> {row.title} </h4>
                                <div
                                  className="size-color-cart"
                                  onClick={() => {
                                    setOpenDialog(true);
                                    setInformation({
                                      _id: row._id,
                                      size: row.allSize,
                                      currSize: row.size,
                                      color: row.color,
                                      title: row.title,
                                      description: row.description,
                                      price: row.priceNoDiscount,
                                      url: row.url,
                                      discount: row.discount,
                                    });
                                  }}
                                >
                                  <span>{row.size}</span>
                                  <span>&nbsp;/&nbsp;</span>
                                  <div
                                    className="color-popover"
                                    style={{ backgroundColor: row.color }}
                                  ></div>
                                  &nbsp;
                                  <ExpandMoreIcon />
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <span className="price-table">${row.price}</span>
                          </TableCell>
                          <TableCell align="center">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <InputCart
                                _id={row._id}
                                color={row.color}
                                size={row.size}
                                totalItem={row.totalItem}
                                product={information}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <span className="price-table">
                              $<Odometer value={row.totalPrice.toFixed(2)} />
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={totalPage}
              size="large"
              page={page}
              onChange={handleChangePage}
            />
          </Paper>
          <ProductModal
            _id={information._id}
            currSize={information.currSize}
            color={information.color}
            product={information}
          />
        </div>
      ) : (
        emptyCart
      )}
    </div>
  );
}
