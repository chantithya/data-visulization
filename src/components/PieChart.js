// src/components/PieChart.js
import React from "react";
import { Chart } from "react-google-charts";

export default function SimplePieChart({ data }) {
  // Count the occurrences of each product type
  const typeCounts = data.reduce((acc, item) => {
    acc[item.Type] = (acc[item.Type] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the Pie Chart
  const chartData = [
    ["Product Type", "Count"],
    ...Object.entries(typeCounts).map(([key, value]) => [key, value]),
  ];

  // Define the chart options
  const options = {
    title: "Product Type Distribution",
    pieSliceText: "percentage",
    pieStartAngle: 100,
    backgroundColor: "#ffffff",
  };

  return (
    <div
      className="dashboard-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        // background: "#f4f6f9",
        borderRadius: "15px",
        // boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        margin: "20px auto",
        maxWidth: "90%", // Responsive width
        width: "100%",
      }}
    >
      {/* Visualization Chart */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px", // Prevents it from stretching too wide
          minWidth: "300px", // Ensures readability on small screens
        }}
      >
        <h3>Pie Chart</h3>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"} // Takes full available width
          height={"400px"} // Maintains consistent height
        />
      </div>
    </div>
  );
}
