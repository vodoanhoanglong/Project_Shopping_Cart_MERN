import React from "react";

import { Line } from "react-chartjs-2";
import { CartContext } from "../../contexts/CartContext";

const convertStringToDate = (string) => {
  const dateParts = string.split("/");
  const result = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  switch (result.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      break;
  }
};

const LineChart = () => {
  const [state, setState] = React.useState(false);
  const {
    cartState: { revenue },
  } = React.useContext(CartContext);

  let key, value;
  if (revenue) {
    key = Object.keys(revenue).reverse();
    value = Object.values(revenue).reverse();
  }

  const data = {
    labels: key && key.map((day) => convertStringToDate(day)),
    datasets: [
      {
        label: "Revenue By Week",
        data: value && value.map((cost) => cost),
        fill: true,
        backgroundColor: "rgba(113,127,224, 0.6)",
        borderColor: "#717fe0",
      },
    ],
  };

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 350) setState(true);
    else setState(false);
  });

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="container-line-chart"
    >
      {state ? <Line data={data} /> : <div style={{ height: 477 }}></div>}
    </div>
  );
};

export default LineChart;
