import React, { useState } from "react";

import { Col, Row, Typography, Table , Card } from "antd";

import Profile from "./Profile";

const { Text } = Typography;

const columns = [
  {
    title: "Transaction Id",
    dataIndex: "transactionId",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Order Id",
    dataIndex: "orderId",
  },
  {
    title: "PO Id",
    dataIndex: "poId",
  },
  {
    title: "Qty",
    dataIndex: "qty",

    render: (qty) => {
      if (qty < 0) {
        return <Text type="danger">{qty}</Text>;
      } else {
        return <Text type="success">+{qty}</Text>;
      }
    },
  },

  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Qty In Hand",
    dataIndex: "qtyInHand",

    render: (item => <div className=" d-flex justify-content-center">{item}</div>)
  },
];

const data = [
  {
    key: 1,
    transactionId: "#123456",
    type: "Service",
    orderId: "#123456789",
    poId: "#123",
    qty: -2,
    date: "29/08/22",
    qtyInHand: "18",
  },
];
for (let i = 2; i <= 7; i++) {
  data.push({
    key: i,
    transactionId: "#123456",
    type: "Service",
    orderId: "#123456789",
    poId: "#123",
    qty: 5,
    date: "29/08/22",
    qtyInHand: "20",
  });
}

const Transactions = () => {
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
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Transactions;
