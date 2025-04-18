// components/Table/index.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

import columns from "../../data/columns";
import data from "../../data/data.json";
import "../../styles/Home.css";

const Table = ({ onTableReady }) => {
  const tableRef = useRef();
  const [loading, setLoading] = useState(true);

  const tableRows = useMemo(() => {
    return data.map((item, rowIndex) => (
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
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No need to include data or columns here

  const tableHeaders = useMemo(() => {
    return columns.map((col) => <th key={col.key}>{col.title}</th>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tableElement = tableRef.current;

    const timeout = setTimeout(() => {
      $(tableElement).DataTable({
        deferRender: true, // For performance
        paging: true,
        pageLength: 10,
      });
      setLoading(false);
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
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
