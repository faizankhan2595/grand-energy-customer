import React, { useState } from "react";

import { Table } from "antd";

import BagImg from "../Assets/Bag.png";

import Actions from "./Actions";

const columns = [
  {
    title: "Item Id",
    dataIndex: "itemId",
    key: "itemId",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.itemId - b.itemId,
  },
  {
    dataIndex: "image",
    key: "image",
    render: (img) => {
      return <img src={img} alt="bag img" />;
    },
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.item - b.item,
  },
  {
    title: "Total Inquiries",
    dataIndex: "totalInquiries",
    key: "totalInquiries",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalInquiries - b.totalInquiries,
  },
  {
    title: "Total Orders",
    dataIndex: "totalOrders",
    key: "totalOrders",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalOrders - b.totalOrders,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => <Actions />,
  },
];

const data = [
  {
    key: 1,
    itemId: "HCI1234-ORD-(1-1)",
    image: BagImg,
    item: "LV NEVERFULL (vachetta leather)",
    totalInquiries: "50",
    totalOrders: "20",
    amount: "S$100.00",
  },
];

for (let i = 2; i <= 5; i++) {
  data.push({
    key: i,
    itemId: "HCI1234-ORD-(1-1)",
    image: BagImg,
    item: "LV NEVERFULL (vachetta leather)",
    totalInquiries: "50",
    totalOrders: "20",
    amount: "S$100.00",
  });
}

const SalesReportTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <React.Fragment>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={false}
      />
    </React.Fragment>
  );
};

export default SalesReportTable;
