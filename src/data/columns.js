const columns = [
    {
      title: "Item",
      dataIndex: "Item",
      key: "item",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "type",
    },
    {
      title: "Serial",
      dataIndex: "Serial",
      key: "serial",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "CTF",
      dataIndex: "CTF",
      key: "ctf",
    },
    {
      title: "Item Link",
      dataIndex: "ItemLink",
      key: "itemLink",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View Item
        </a>
      ),
    },
    {
      title: "Artwork ID",
      dataIndex: "DataArtworkId",
      key: "artworkId",
    },
    {
      title: "Product Type ID",
      dataIndex: "DataProductTypeId",
      key: "productTypeId",
    },
    {
      title: "Item Option ID",
      dataIndex: "DataItemOptionId",
      key: "itemOptionId",
    },
    {
      title: "Device Type ID",
      dataIndex: "DataDeviceTypeId",
      key: "deviceTypeId",
    },
    {
      title: "Item Type",
      dataIndex: "DataItemType",
      key: "itemType",
    },
    {
      title: "Layout",
      dataIndex: "DataLayout",
      key: "layout",
    },
  ];
  
  export default columns;
  