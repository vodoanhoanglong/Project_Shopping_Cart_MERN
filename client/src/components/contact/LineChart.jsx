import React from "react";

import { Line } from "react-chartjs-2";

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

const options = {
  plugins: {
    legend: {
      labels: {
        font: {
          size: 40,
          family: "'Bebas Neue', cursive",
          weight: "bold",
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        text: "Dollar",
        callback: function (value, index, values) {
          return "$" + value;
        },
        font: {
          size: 20,
          family: "'Bebas Neue', cursive",
          weight: "bold",
        },
        padding: 20,
      },
    },
    x: {
      ticks: {
        font: {
          size: 20,
          family: "'Bebas Neue', cursive",
          weight: "bold",
        },
        padding: 20,
      },
    },
  },
  animation: { duration: 1800 },
};

const LineChart = (props) => {
  const { revenue } = props;
  const [state, setState] = React.useState(false);
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
        backgroundColor: "rgba(113,127,224, 0.4)",
        borderColor: "#717fe0",
        tension: 0.3,
      },
    ],
  };

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 130) setState(true);
    else setState(false);
  });

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1500"
      className="container-line-chart"
    >
      {state ? (
        <Line data={data} options={options} />
      ) : (
        <div style={{ height: 477 }}></div>
      )}
    </div>
  );
};

export default LineChart;
