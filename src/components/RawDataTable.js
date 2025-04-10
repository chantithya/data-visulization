// src/components/RawDataTable.js
import React, { useEffect, useMemo, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-responsive-dt";

export default function RawDataTable({ data }) {
  const tableRef = useRef(null);

  useEffect(() => {
    let dataTable;

    if (data.length > 0) {
      // Delay to let table render
      const timer = setTimeout(() => {
        if ($.fn.dataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().clear().destroy();
        }

        dataTable = $(tableRef.current).DataTable({
          responsive: true,
          paging: true,
          pageLength: 10,
          processing: true,
          stateSave: true,
          ordering: true,
        });
      }, 100); // slight delay for smoother mount

      return () => {
        clearTimeout(timer);
        if (dataTable) {
          dataTable.destroy(true);
        }
      };
    }
  }, [data]);

  const tableRows = useMemo(() => {
    return data.map((item, index) => (
      <tr key={index}>
        <td>{item.Item}</td>
        <td>{item.Type}</td>
        <td>{item.Serial}</td>
        <td>${item.Price}</td>
        <td>{item.CTF}</td>
        <td><a href={item.ItemLink} target="_blank" rel="noopener noreferrer">View</a></td>
        <td>{item.DataArtworkId}</td>
        <td>{item.DataProductTypeId}</td>
        <td>{item.DataItemOptionId}</td>
        <td>{item.DataDeviceTypeId}</td>
        <td>{item.DataItemType}</td>
        <td>{item.DataLayout}</td>
      </tr>
    ));
  }, [data]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Raw Data</h3>
      <div className="table-responsive">
        <table
          ref={tableRef}
          id="data-table"
          className="display nowrap table table-striped"
          style={{ width: "100%" }}
        >
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
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
}
