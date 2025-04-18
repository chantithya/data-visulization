// src/components/DataFetcher.js
import React, { useEffect, useState, Suspense } from "react";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import "datatables.net-responsive-dt";
import "datatables.net-dt";
// import BarChart from "./BarChart";
// import PieChart from "./PieChart";
// import StackedBarChart from "./StackedBarChart";
// import RawDataTable from "./RawDataTable";
import Table from "./Table"

export default function DataFetcher({ onTableReady }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lazy load charts using React.lazy for performance improvement
  const LazyBarChart = React.lazy(() => import("./BarChart"));
  const LazyPieChart = React.lazy(() => import("./PieChart"));
  const LazyStackedBarChart = React.lazy(() => import("./StackedBarChart"));

  // Load data asynchronously to avoid blocking UI thread
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("../data/data.json");
        setData(response.default);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  return (
    <div className="chart-container" style={{ width: "100%", margin: "0 auto", padding: "20px" }}>

      {/* Raw Data Table Section */}
      <Table onTableReady={onTableReady} />

      <div style={{ marginTop: "40px" }}>
        <h3>Bar Chart</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <LazyBarChart data={data} />
        </Suspense>
      </div>

      <hr />

      <div style={{ marginTop: "40px" }}>
        <Suspense fallback={<div>Loading chart...</div>}>
          <LazyPieChart data={data} />
        </Suspense>
      </div>

      <hr />

      <div style={{ marginTop: "40px" }}>
        <h3>Stacked BarChart</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <LazyStackedBarChart data={data} />
        </Suspense>
      </div>
    </div>
  );
}
