import React, { useState } from "react";

import { Col, Row, Typography, Table , Card, Tag } from "antd";

import Profile from "./Profile";
import Actions from "./Actions-PurchaseOrders";

const { Text } = Typography;

const columns = [
  {
    title: "Po Number",
    dataIndex: "poNumber",
  },
  {
    title: "Part & Materials",
    dataIndex: "partAndMaterials",
  },
  {
    title: "Po Date",
    dataIndex: "poDate",
  },
 

  {
    title: "Qty",
    dataIndex: "qty",
  },
  {
    title: "Price/Unit",
    dataIndex: "priceUnit",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
  },
  
  {
    title: "Status",
    dataIndex: "status",

    render: (status) => {
      return <Tag color="success">{status}</Tag>;
    },
  },

  {
    title: "Action",
    dataIndex: "action",

    render: () => <Actions/>
  }
];

const data = [
  {
    key: 1,
    poNumber: "HC-123456",
    partAndMaterials: "Spray Paints, Brushes,",
    poDate: "19/08/22",
    qty: 10,
    priceUnit: "S$100.00",
    totalPrice: "S$100.00",
    status: "Active"
  },
];
for (let i = 2; i <= 8; i++) {
  data.push({
    key: i,
    poNumber: "HC-123456",
    partAndMaterials: "Spray Paints, Brushes,",
    poDate: "19/08/22",
    qty: 10,
    priceUnit: "S$100.00",
    totalPrice: "S$100.00",
    status: "Active"
  });
}

const PurchaseOrders = () => {
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
    <React.Fragment>
      <Row gutter={20}>
        <Col span={6}>
          <Profile />
        </Col>
        <Col span={18}>
          <Card>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              className="w-100"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PurchaseOrders;
