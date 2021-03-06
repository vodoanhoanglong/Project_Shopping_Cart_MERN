import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

import { AuthContext } from "../../contexts/AuthContext";

import "../../css/Coupon.css";
import CouponEmpty from "../../assets/coupon.png";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});
const sortStatus = (array, bySort) => {
  return array.sort((a, b) =>
    !a.status === bySort ? -1 : a.status === bySort ? 1 : 0
  );
};

export default function Coupon() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState(true);

  const {
    authState: { user },
  } = React.useContext(AuthContext);

  const perPage = 5;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = user.couponCode
    ? Math.ceil(user.couponCode.length / perPage)
    : 0;

  const handleChangeSortBy = () => setSortBy(!sortBy);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const headTable = ["Code", "Discount"];

  return (
    <div
      className="coupon animate__animated animate__fadeIn"
      style={{ textAlign: "center" }}
    >
      <h1>My Coupon</h1>
      {totalPage > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: 70 }}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {headTable.map((label, index) => (
                  <TableCell key={index} align="center">
                    <h5>{label}</h5>
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  onClick={handleChangeSortBy}
                  style={{ cursor: "pointer" }}
                >
                  <h5>
                    Status <ImportExportIcon />
                  </h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortStatus(user.couponCode, sortBy)
                .slice(start, end)
                .map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.discount}%</TableCell>
                    <TableCell
                      align="center"
                      style={{ color: row.status ? "gray" : "green" }}
                    >
                      {row.status ? "Expired" : "Can be used"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPage}
            size="large"
            page={page}
            onChange={handleChangePage}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
        </TableContainer>
      ) : (
        <div className="empty-order">
          <img src={CouponEmpty} alt="" style={{ width: 180, height: 180 }} />
          <h1>You don't have any discount code</h1>
        </div>
      )}
    </div>
  );
}
