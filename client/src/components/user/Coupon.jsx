import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

import { AuthContext } from "../../contexts/AuthContext";

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

  return (
    <div className="profile animate__animated animate__fadeIn">
      <h1>My Coupon</h1>
      <TableContainer component={Paper} style={{ marginTop: 70 }}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {totalPage > 0 ? (
              user.couponCode.slice(start, end).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
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
