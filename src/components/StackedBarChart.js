// src/components/StackedBarChart.js
import React from "react";
import { Chart } from "react-google-charts";

export default function StackedBarChart({ data }) {
  const processData = (data) => {
    const typeMap = {};

    data.forEach((item) => {
      const price = parseFloat(item.Price);
      if (!typeMap[item.Type]) {
        typeMap[item.Type] = price;
      } else {
        typeMap[item.Type] += price;
      }
    });

    return [["Type", "Sum of Price"], ...Object.entries(typeMap)];
  };

  const chartData = processData(data);

  const options = {
    title: "Sum of Price by Type",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Sum of Price ($)",
      minValue: 0,
    },
    vAxis: {
      title: "Product Type",
    },
    bars: "horizontal", // Horizontal Bar Chart
    isStacked: true, // Enable stacking
    colors: ["#1E88E5"], // Customize color
  };

  return (
    <div className="stacked-chart-wrapper">
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
