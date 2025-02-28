import React, { useEffect, useState } from "react";

import { Table, Button, Tag, Typography, Space } from "antd";
import Icon from "@ant-design/icons";

import SprayPaintImg from "assets/SprayPaint.png";

import Actions from "./Actions";
import ProfilePic from "assets/Avatar2.png";
import { ShoesIcon, BagIcon , PayPalIcon , MoneyIcon , GooglePayIcon } from "../SvgIcon";

const { Text } = Typography;

let onSendAlert;

const columns = [
  {
    title: "Invoice Id",
    dataIndex: "invoiceId",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.customerName - b.customerName,
    render: (item) => {
      const { text, image } = item;
      return (
        <div className="d-flex">
          <img src={image} className="mr-3" />
          <Text>{text}</Text>
        </div>
      );
    },
  },
  {
    title: "Items",
    dataIndex: "items",

    render: (item) => {
      const render = item.map((element) => {
        return <Icon component={element} />;
      });

      return (
        <Space className="d-flex" size="small">
          {render}
        </Space>
      );
    },
  },
  {
    title: "Invoice Date",
    dataIndex: "invoiceDate",
  },

  {
    title: "Amount",
    dataIndex: "amount",
  },

  {
    title: "Payment Type",
    dataIndex: "paymentType",

    render: (item) => {
      return (
        <div className="d-flex justify-content-center">
          <Icon component={item} />
        </div>
      );
    },
  },

  {
    title: "Status",
    dataIndex: "status",

    render: (status) => {
      const { text, color } = status;
      return (
        <span>
          <Tag color={color} key={text}>
            {text}
          </Tag>
        </span>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <Actions onSendAlert={onSendAlert}/>,
  },
];

const paymentType = [PayPalIcon , MoneyIcon , GooglePayIcon ,  PayPalIcon , PayPalIcon ];

const status = [
  { color: "green", text: "Paid" },
  { color: "green", text: "Paid" },
  { color: "red", text: "Invalid" },
  { color: "purple", text: "Partial" },
  { color: "green", text: "Paid" },
];

const data = [
  {
    key: 1,
    invoiceId: "HCI1234-INV",
    customerName: { text: "John Smith", image: ProfilePic },
    items: [ShoesIcon, BagIcon],
    invoiceDate: "22/08/2022",
    amount: "S$120.23",
    paymentType: paymentType[0],
    status: status[0],
  },
];
for (let i = 2; i <= 5; i++) {
  data.push({
    key: i,
    invoiceId: "HCI1234-INV",
    customerName: { text: "John Smith", image: ProfilePic },
    items: [ShoesIcon, BagIcon],
    invoiceDate: "22/08/2022",
    amount: "S$120.23",
    paymentType: paymentType[i - 1],
    status: status[i - 1],
  });
}

const InvoicesTable = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

 onSendAlert = props.onSendAlert;

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler,
  };

  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data}  pagination= {false}/>
    </div>
  );
};

export default InvoicesTable;
