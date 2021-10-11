import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";

import "../../css/Filter.css";

const useStyles = makeStyles({
  root: {
    height: 150,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

const useStylesSlider = makeStyles({
  root: {
    width: 300,
  },
  rail: {
    color: "white",
    opacity: 1,
  },
  track: {
    color: "#717FE0",
    opacity: 1,
  },
  thumb: {
    color: "#717FE0",
  },
});

const RangeSlider = (props) => {
  const classes = useStylesSlider();
  const { value, setValue } = props;

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div className={classes.root}>
      <div className="slider-filter">
        <b>Price:</b>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          max={3000}
          classes={{
            rail: classes.rail,
            track: classes.track,
            thumb: classes.thumb,
          }}
        />
      </div>
    </div>
  );
};

const Checkboxes = (props) => {
  const { label, value, setValue } = props;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) setValue((prevValue) => [...prevValue, label]);
  };

  return (
    <div className="checkbox-filter">
      <Checkbox
        checked={checked}
        style={{ color: "white" }}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
        value={value}
      />
      <span>{label}</span>
    </div>
  );
};

const sizeClothes = ["XS", "S", "M", "L", "XL", "XXL"];
const sizeShoes = ["38", "39", "40", "41", "42", "43", "44", "45"];
const sizeWatches = ["28mm", "29mm", "30mm", "31mm", "32mm", "33mm"];

export default function Filter(props) {
  const { setData, handle } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState([]);
  const [price, setPrice] = React.useState([10, 500]);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [type, setType] = React.useState("");

  const handleToggle = (event, nodeIds) => setExpanded(nodeIds.slice(0, 1));
  const handleSelect = (event, nodeIds) => setSelected(nodeIds);

  const checkPrice = (passValue) =>
    passValue > price.slice(0, 1) && passValue < price.slice(1);

  const handleClick = (nodeIds) => (e) => {
    setValue([]);
    setType(nodeIds);
  };

  const handleApply = () => {
    if (type && value.length) {
      setData((prevData) => [
        ...prevData.filter(
          (item) =>
            item.type === type &&
            Boolean(value.find((size) => item.size.includes(size))) &&
            checkPrice(item.price)
        ),
      ]);
      handle();
    }
  };

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        <TreeItem nodeId="Men" label="Men" onClick={handleClick("Men")}>
          <div className="d-flex">
            {sizeClothes.map((item, index) => (
              <TreeItem
                key={index}
                nodeId={`${index}men`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
        <TreeItem nodeId="Women" label="Women" onClick={handleClick("Women")}>
          <div className="d-flex">
            {sizeClothes.map((item, index) => (
              <TreeItem
                key={index}
                nodeId={`${index}women`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
        <TreeItem nodeId="Shoes" label="Shoes" onClick={handleClick("Shoes")}>
          <div className="d-flex">
            {sizeShoes.map((item, index) => (
              <TreeItem
                key={index}
                nodeId={`${index}shoes`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
        <TreeItem
          nodeId="Watches"
          label="Watches"
          onClick={handleClick("Watches")}
        >
          <div className="d-flex">
            {sizeWatches.map((item, index) => (
              <TreeItem
                key={index}
                nodeId={`${index}watches`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
      </TreeView>
      <RangeSlider value={price} setValue={setPrice} />
      <div className="container-btn-filter">
        <button className="delete-filter">clear filter</button>
        <button className="apply-filter" onClick={handleApply}>
          Apply
        </button>
      </div>
    </>
  );
}
