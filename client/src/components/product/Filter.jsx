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

  const [checked, setChecked] = React.useState(
    value.includes(label) ? true : false
  );

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) setValue((prevValue) => [...prevValue, label]);
    else
      setValue((prevValue) => [...prevValue.filter((item) => item !== label)]);
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
  const {
    setData,
    handle,
    type,
    setType,
    selected,
    setSelected,
    expanded,
    setExpanded,
    price,
    setPrice,
    value,
    setValue,
    currData,
  } = props;
  const classes = useStyles();

  const handleToggle = (event, nodeIds) => setExpanded(nodeIds.slice(0, 1));
  const handleSelect = (event, nodeIds) => setSelected(nodeIds);

  const checkPrice = (passValue) =>
    passValue > price.slice(0, 1) && passValue < price.slice(1);

  const handleClick = (nodeIds) => (e) => {
    setValue([]);
    setType(nodeIds);
  };

  const handleApply = () => {
    if (type && value.length)
      setData(
        currData.filter(
          (item) =>
            item.type === type &&
            Boolean(value.find((size) => item.size.includes(size))) &&
            checkPrice(item.price)
        )
      );
    else if (type)
      setData(
        currData.filter((item) => item.type === type && checkPrice(item.price))
      );
    else setData(currData.filter((item) => checkPrice(item.price)));
    handle();
  };

  const handleClear = () => {
    setData(currData);
    setValue([]);
    setPrice([0, 3000]);
    setExpanded([]);
    setSelected("");
    setType("");
    handle();
  };

  const style = (kind) => (kind === type ? { color: "#717FE0" } : null);

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
        <TreeItem
          nodeId="Men"
          label="Men"
          style={style("Men")}
          onClick={handleClick("Men")}
        >
          <div className="d-flex">
            {sizeClothes.map((item, index) => (
              <TreeItem
                key={index}
                style={{ color: "white" }}
                nodeId={`${index}men`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
        <TreeItem
          nodeId="Women"
          label="Women"
          style={style("Women")}
          onClick={handleClick("Women")}
        >
          <div className="d-flex">
            {sizeClothes.map((item, index) => (
              <TreeItem
                key={index}
                style={{ color: "white" }}
                nodeId={`${index}women`}
                label={
                  <Checkboxes label={item} setValue={setValue} value={value} />
                }
              />
            ))}
          </div>
        </TreeItem>
        <TreeItem
          nodeId="Shoes"
          label="Shoes"
          style={style("Shoes")}
          onClick={handleClick("Shoes")}
        >
          <div className="d-flex">
            {sizeShoes.map((item, index) => (
              <TreeItem
                key={index}
                style={{ color: "white" }}
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
          style={style("Watches")}
          onClick={handleClick("Watches")}
        >
          <div className="d-flex">
            {sizeWatches.map((item, index) => (
              <TreeItem
                key={index}
                style={{ color: "white" }}
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
        <button className="delete-filter" onClick={handleClear}>
          clear filter
        </button>
        <button className="apply-filter" onClick={handleApply}>
          Apply
        </button>
      </div>
    </>
  );
}
