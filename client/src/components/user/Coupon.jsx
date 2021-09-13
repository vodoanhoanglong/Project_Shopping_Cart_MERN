import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

import { AuthContext } from "../../contexts/AuthContext";

import "../../css/Coupon.css";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Coupon() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const {
    authState: { user },
  } = React.useContext(AuthContext);

  const perPage = 5;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = user.couponCode
    ? Math.ceil(user.couponCode.length / perPage)
    : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const headTable = ["Code", "Status"];

  return (
    <div className="coupon animate__animated animate__fadeIn">
      <h1>My Coupon</h1>
      <TableContainer component={Paper} style={{ marginTop: 70 }}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {headTable.map((label, index) => (
                <TableCell key={index} align="center">
                  <h5>{label}</h5>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {totalPage > 0 ? (
              user.couponCode.slice(start, end).map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell
                    align="center"
                    style={{ color: row.status ? "gray" : "green" }}
                  >
                    {row.status ? "Used" : "Not use"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>Hi</h1>
            )}
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
    </div>
  );
}
