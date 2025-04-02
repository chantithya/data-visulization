// src/components/DataFetcher.js
import React, { useEffect, useState } from "react";
import $ from "jquery"; // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.css';  // Correct DataTables CSS import
import "datatables.net-responsive-dt"; // Import DataTables Responsive plugin
import "datatables.net-dt"; // Import DataTables
import BarChart from "./BarChart";
import PieChart from "./PieChart"; // Import the new Pie Chart component
import StackedBarChart from "./StackedBarChart";

export default function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('../data/data.json');
        setData(response.default);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  // Initialize DataTable after data loads
  useEffect(() => {
    if (data.length > 0) {
      const table = $("#data-table").DataTable({
        responsive: true,
        destroy: true,
        paging: true,
        pageLength: 10,
        processing: true,
        stateSave: true,
        ordering: true,
      });
  
      return () => {
        table.destroy(); // Cleanup DataTable instance on component unmount
      };
    }
  }, [data]);  

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  return (
    <div className="chart-container" style={{ width: "100%", margin: "0 auto", padding: "20px" }}>

      <div style={{ marginTop: "40px" }}>
        <h3>Raw Data</h3>
        <div className="table-responsive">
          <table id="data-table" className="display table table-striped" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Serial</th>
                <th>Price</th>
                <th>CTF</th>
                <th>Item Link</th>
                <th>Data Artwork Id</th>
                <th>Data Product Type Id</th>
                <th>Data Item Option Id</th>
                <th>Data Device Type Id</th>
                <th>Data Item Type</th>
                <th>Data Layout</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Item}</td>
                  <td>{item.Type}</td>
                  <td>{item.Serial}</td>
                  <td>${item.Price}</td>
                  <td>{item.CTF}</td>
                  <td><a href={item.ItemLink}>{item.ItemLink}</a></td>
                  <td>{item.DataArtworkId}</td>
                  <td>{item.DataProductTypeId}</td>
                  <td>{item.DataItemOptionId}</td>
                  <td>{item.DataDeviceTypeId}</td>
                  <td>{item.DataItemType}</td>
                  <td>{item.DataLayout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h3>Bar Chart</h3>
        <BarChart data={data} />
      </div>
      <hr />
      <div style={{ marginTop: "40px" }}>
        <PieChart data={data} />
      </div>
      <hr />
      <div style={{ marginTop: "40px" }}>
        <h3>Stacked BarChart</h3>
        <StackedBarChart data={data} />
      </div>
      
    </div>
  );
}
