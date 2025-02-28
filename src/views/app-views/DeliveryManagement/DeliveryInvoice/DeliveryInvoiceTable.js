import React, { useState } from "react";

import { Table, Button, Tag , Typography , Space} from "antd";
import Icon from "@ant-design/icons"


import SprayPaintImg from "assets/SprayPaint.png"

import Actions from "./Actions";
import ProfilePic from 'assets/Avatar2.png';
import { ShoesIcon , BagIcon } from "../SvgIcon";

const {Text} = Typography;

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
      const render = (
        item.map((element) => {
          return (
            <Icon component={element}/>
          )
        })
        )

        return (
          <Space className="d-flex" size="small">
            {render}
          </Space>
        )
    }
  },
  {
    title: "Inquiry Date",
    dataIndex: "inquiryDate", 
  },
  {
    title: "Service Handover Date",
    dataIndex: "serviceHandoverDate",
  },
  {
    title: "Delivery Date",
    dataIndex: "deliveryDate",
    
  },
  {
    title: "Amount",
    dataIndex: "amount",
    
  },
  
  {
    title: "Status",
    dataIndex: "status",

    render: (status) => {
      const color = status === "Item Delivered" ? "green" : "yellow";
      return (
        <span>
          <Tag color={color} key={status}>
            {status}
          </Tag>
        </span>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <Actions />,
  },
];

const data = [
  {
    key: 1,
    invoiceId: "HCI1234-INV",
    customerName: {text: "John Smith" , image: ProfilePic},
    items: [ShoesIcon , BagIcon],
    inquiryDate: "22/08/2022",
    serviceHandoverDate: "22/08/2022",
    deliveryDate: "N/A",
    amount: "S$120.23",
    status: "Pending Delivery",
  },
];
for (let i = 2; i <= 5; i++) {
  data.push({
    key: i,
    invoiceId: "HCI1234-INV",
    customerName: {text: "John Smith" , image: ProfilePic},
    items: [ShoesIcon , BagIcon],
    inquiryDate: "22/08/2022",
    serviceHandoverDate: "22/08/2022",
    deliveryDate: "23/08/2022",
    amount: "S$120.23",
    status: "Item Delivered",
  });
}

const DeliveryInvoiceTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default DeliveryInvoiceTable;
