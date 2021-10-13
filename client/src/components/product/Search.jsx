import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Filter from "./Filter";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const { handle, data, setData } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [price, setPrice] = useState([0, 3000]);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("");
  const [valueInput, setValueInput] = useState("");

  const searchResult = (e) => {
    e.preventDefault();
    setOpen(false);
    setData(
      data.filter((item) =>
        item.title.toLowerCase().includes(valueInput.toLowerCase())
      )
    );
    handle();
  };
  const handleChange = (event) => setValueInput(event.target.value);
  const handleClick = () => setOpen((prevOpen) => !prevOpen);
  const handleClickSearch = (e) => valueInput && searchResult(e);

  return (
    <>
      <Paper component="form" className={classes.root}>
        <Tooltip title="Filter" placement="top" arrow>
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        <InputBase
          className={classes.input}
          placeholder="Search by name"
          inputProps={{ "aria-label": "Search" }}
          value={valueInput}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleClickSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="filter-child">
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
            setOpen={setOpen}
            currData={data}
          />
        </div>
      </Collapse>
    </>
  );
}
