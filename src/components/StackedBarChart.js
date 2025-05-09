import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colorPalette = {
  "Black": "#000000",
  "Primrose Pink": "#D81B60",
  "Baby Blue": "#89CFF0",
  "Cobalt Blue": "#0047AB",
  "Deep Green": "#006400",
  "Matte Black": "#28282B",
  "Sky Blue": "#87CEEB",
  "Purple": "#800080",
  "Purple (Glitter)": "#8E3FE2",
  "Indigo (Glitter)": "#4B0082",
  "Clear": "#FFFFFF", // usually transparent, fallback to white
  "Sky-Blue": "#00BFFF",
  "Indigo": "#4b0082",
  "Classic Blue": "#0f4c81",
  "Leopard": "#f48700",
  "Black Croc": "#1C1C1C",
  "Burgundy Croc": "#800020",
  "Tan Blue": "#D2B48C",
  "Silver on Black": "#A9A9A9",
  "Black on Black": "#1A1A1A",
  "Mint Brown": "#8B6F4E",
  "Lilac Green": "#9DC183",
  "Frost": "#E5F9F6",
  "Tan": "#D2B48C",
  "Matte Charcoal": "#36454F",
  "Matte Greige": "#BEB6B0",
  "Matte Deep Purple": "#673AB7",
  "Matte Dusty Rose": "#C08081",
  "Cotton Candy": "#FFBCD9",
  "Peach Haze": "#FFDAB9",
  "Pink Ombre": "#FFB6C1",
  "Peri Purple": "#CCCCFF",
  "Glossy Black": "#252324",
  "Neonyellow": "#E4FF1A",
  "Glossy Frost": "#E0FFFF",
  "Pink Blue": "#FF69B4",
  "Red": "#FF0000",
  "Dark Purple": "#301934",
  "Glitter Yellow": "#FFF700",
  "Neon Yellow": "#FFFF33",
  "Midnight Green": "#004953",
  "Silver on Silver": "#C0C0C0",
  "Peach": "#FFE5B4",
  "Olive": "#808000",
  "Sunset": "#FFCC99",
  "Matte Red": "#A52A2A",
  "Orange": "#FFA500",
  "Yellow": "#FFFF00",
  "Green": "#008000",
  "Blue": "#0000FF",
  "Glossy Black Black": "#111111",
  "Matte Light Blue": "#ADD8E6",
  "Iridescent": "#E1E6FF",
  "Triple Black": "#0A0A0A",
  "Sierra Blue": "#6A9FB5",
  "White": "#FFFFFF",
  "Matte Off White": "#FAF9F6",
  "Phantom Black": "#1B1B1B",
  "Glossy Clear": "#F8F8F8",
  "Pink": "#FFC0CB",
  "Glossy Light Blue": "#B3D9FF",
  "Kiwi": "#8EE53F",
  "Bubble Gum": "#FFC1CC",
  "Matte Purple": "#9370DB",
  "Matte White Sand": "#F5F5DC",
  "Matte Pink": "#FFB6C1",
  "Silver on Blck": "#C0C0C0",
  "Matte Taupe": "#483C32",
  "Haze Purple": "#DCD0FF",
  "Lilac": "#C8A2C8",
  "Purple Disco": "#9F00C5",
  "Jet Black": "#343434",
  "Navy Blue": "#000080",
  "Latte": "#A7856A",
  "Oat Milk": "#F6E2B3",
  "Greige (Light Brown)": "#BEB6AA",
  "Polar Blue": "#A3D8F4",
  "Violet Purple": "#7F00FF",
  "Kelly Green": "#4CBB17",
  "Deep Purple": "#673AB7",
  "Berry Pink": "#FF66CC",
  "Matte Vapor Blue": "#B6D0E2",
  "Hot Pink": "#FF69B4",
  "Neon Yellow-": "#FFFF33"
};




export default function StackedBarChart({ data }) {
  const chartRef = useRef(null);

  // download image
  const handleDownloadImage = () => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image("image/png", 1);
      const link = document.createElement("a");
      link.href = url;
      link.download = "stacked-bar-chart.png";
      link.click();
    }
  };

  // download pdf
  const handleDownloadPDF = async () => {
    const input = document.getElementById("chart-container");
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, width, height - 20);
      pdf.save("stacked-bar-chart.pdf");
    }
  };

  const colorMap = new Map();

  const normalizeColorName = (colorName) => {
    return colorName
      .toLowerCase()
      .replace(/\s+/g, "") // Remove spaces
      .replace(/[-()]/g, ""); // Remove hyphens and parentheses
  };
  
  const processData = (data) => {
    const grouped = {};
    const colorVariants = new Set();
  
    data.forEach((item) => {
      const type = item.Type;
      const variant = normalizeColorName(item.DataItemType); // Normalize color name
      const price = parseFloat(item.Price);
  
      if (!grouped[variant]) grouped[variant] = {};
      if (!grouped[variant][type]) grouped[variant][type] = 0;
  
      grouped[variant][type] += price;
      colorVariants.add(variant);
    });
  
    // Assign colors
    const colorKeys = Object.keys(colorPalette);
    Array.from(colorVariants).forEach((variant, index) => {
      const colorName = colorKeys.find((key) => normalizeColorName(key) === variant);
      if (colorName) {
        colorMap.set(variant, colorPalette[colorName]);
      }
    });
  
    console.log("Color Variants Map:", Object.fromEntries(colorMap.entries()));
  
    const productTypes = [...new Set(data.map((item) => item.Type))];
    const datasets = Array.from(colorVariants).map((variant) => ({
      label: variant,
      data: productTypes.map((type) => grouped[variant][type] || 0),
      backgroundColor: colorMap.get(variant),
    }));
  
    return {
      labels: productTypes,
      datasets,
    };
  };
  

  const chartData = processData(data);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sum Price by Product Type & Color Variant",
        font: { size: 20 },
        padding: { top: 10, bottom: 30 },
      },
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          // Custom tooltip callback
          label: (context) => {
            const dataset = context.dataset;
            const type = dataset.label;
            const price = context.raw.toFixed(2);
            return `${type}: $${price}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Product Type",
          font: { size: 14 },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Total Price ($)",
          font: { size: 14 },
        },
      },
    },
  };
  

    return (
    <div
      id="chart-container"
      style={{
        padding: "2rem",
        maxWidth: "12000px",
        margin: "2rem auto",
      }}
    >
      <Bar ref={chartRef} data={chartData} options={options} height={500} />

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleDownloadImage} style={buttonStyle}>
          📸 Download Image
        </button>
        <button onClick={handleDownloadPDF} style={buttonStyle}>
          📄 Download PDF
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "1rem" }}>🎨 Color Variants:</h3>
          <ul style={{ columns: 2, listStyle: "none", padding: 0 }}>
            {Array.from(colorMap.entries()).map(([variant, color]) => (
              <li
                key={variant}
                style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: color,
                    borderRadius: "4px",
                    marginRight: "0.5rem",
                    border: "1px solid #ccc",
                  }}
                ></div>
                <span>
                  {variant} : <code>{color}</code>
                </span>
              </li>
            ))}
          </ul>

      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

buttonStyle[':hover'] = {
  backgroundColor: "#45a049",
};


