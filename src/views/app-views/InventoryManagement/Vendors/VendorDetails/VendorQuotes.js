import React, { useState } from "react";

import { Col, Row, Typography, Table , Card, Tag } from "antd";

import Profile from "./Profile";
import Actions from "./Actions-Po";

const { Text } = Typography;

const columns = [
  {
    title: "Quote Id",
    dataIndex: "quoteId",
  },
  {
    title: "Part & Materials",
    dataIndex: "partAndMaterials",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Validity",
    dataIndex: "validity",
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
    title: "Discount",
    dataIndex: "discount",
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
    quoteId: "HC-123456",
    partAndMaterials: "Spray Paints, Brushes,",
    date: "19/08/22",
    validity: "19/08/22",
    qty: 10,
    priceUnit: "S$100.00",
    discount: "20%",
    status: "Active"
  },
];
for (let i = 2; i <= 5; i++) {
  data.push({
    key: i,
    quoteId: "HC-123456",
    partAndMaterials: "Spray Paints, Brushes,",
    date: "19/08/22",
    validity: "19/08/22",
    qty: 10,
    priceUnit: "S$100.00",
    discount: "20%",
    status: "Active"
  });
}

const VendorQuotes = () => {
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
              scroll = {{x: true}}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default VendorQuotes;
