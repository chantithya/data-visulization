// components/Table/index.jsx 
import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

import columns from "../../data/columns";
import data from "../../data/data.json";


// components/Table/index.jsx
const Table = ({ onTableReady }) => {
  const tableRef = useRef();

  useEffect(() => {
    const tableElement = tableRef.current;

    const timeout = setTimeout(() => {
      $(tableElement).DataTable(); // Initialize DataTable
      if (onTableReady) {
        onTableReady(); // Notify parent that table is ready
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
      <table ref={tableRef} className="display" style={{ width: "100%" }}>
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

