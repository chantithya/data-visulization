// src/components/PieChart.js
import React, { useRef } from "react";
import { Chart } from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PieChart.css"; // 👈 import CSS here

export default function SimplePieChart({ data }) {
  const chartRef = useRef();
  console.log(data);
  const typeCounts = data.reduce((acc, item) => {
    acc[item.Type] = (acc[item.Type] || 0) + 1;
    return acc;
  }, {});

  const sortedEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const chartData = [["Product Type", "Count"], ...sortedEntries];

  const options = {
    title: "Product Type Distribution",
    pieSliceText: "percentage",
    pieStartAngle: 0,
    backgroundColor: "#ffffff",
  };

  const handleDownloadImage = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const handleDownloadPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("chart.pdf");
    });
  };

  return (
    <div className="dashboard-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", borderRadius: "15px", margin: "20px auto", maxWidth: "90%", width: "100%" }}>
      <div ref={chartRef} style={{ width: "100%", maxWidth: "600px", minWidth: "300px" }}>
        <Chart chartType="PieChart" data={chartData} options={options} width={"100%"} height={"400px"} />
      </div>

      {/* Styled Download Buttons */}
      <div className="download-buttons">
        <button onClick={handleDownloadImage}>📷 Download Image</button>
        <button onClick={handleDownloadPDF}>📄 Download PDF</button>
      </div>
    </div>
  );
}
