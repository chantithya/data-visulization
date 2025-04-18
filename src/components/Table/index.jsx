import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

import columns from "../../data/columns";
import data from "../../data/data.json";
import "../../styles/Home.css"; 



const Table = ({ onTableReady }) => {
  const tableRef = useRef();
  const [loading, setLoading] = useState(true); // Start with loading state

  useEffect(() => {
    const tableElement = tableRef.current;

    const timeout = setTimeout(() => {
      $(tableElement).DataTable(); // Initialize DataTable
      setLoading(false); // Once DataTable is ready, stop loading
      if (onTableReady) {
        onTableReady();
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if ($.fn.DataTable.isDataTable(tableElement)) {
        $(tableElement).DataTable().destroy(true);
      }
    };
  }, [onTableReady]);

  return (
    <div style={{ overflowX: "auto" }}>
      {loading && (
        // <div style={{ textAlign: "center", padding: "20px" }}>
        //   <span>Loading DataTable...</span>
        // </div>
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      <table
        ref={tableRef}
        className="display"
        style={{ width: "100%", display: loading ? "none" : "table" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => {
                const cellData = item[col.dataIndex];
                return (
                  <td key={col.key}>
                    {col.render ? col.render(cellData, item) : cellData}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
