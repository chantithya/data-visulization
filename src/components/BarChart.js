// src/components/BarChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data }) {
  const processData = (data) => {
    const typeMap = {};

    data.forEach(item => {
      const price = parseFloat(item.Price);
      if (!typeMap[item.Type]) {
        typeMap[item.Type] = {
          prices: [price],
          min: price,
          max: price,
          sum: price
        };
      } else {
        typeMap[item.Type].prices.push(price);
        typeMap[item.Type].min = Math.min(typeMap[item.Type].min, price);
        typeMap[item.Type].max = Math.max(typeMap[item.Type].max, price);
        typeMap[item.Type].sum += price;
      }
    });

    return Object.keys(typeMap).map(type => ({
      type,
      min: typeMap[type].min,
      max: typeMap[type].max,
      avg: typeMap[type].sum / typeMap[type].prices.length
    }));
  };

  const processedData = processData(data);

  const chartData = {
    labels: processedData.map(item => item.type),
    datasets: [
      {
        label: 'Minimum Price',
        data: processedData.map(item => item.min),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Average Price',
        data: processedData.map(item => item.avg),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Maximum Price',
        data: processedData.map(item => item.max),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Makes the chart adapt to container size
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Analysis by Product Type',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Product Types'
        }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price ($)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <Bar data={chartData} options={options} />
    </div>
  );
}
