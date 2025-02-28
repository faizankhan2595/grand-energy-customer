import React, { useState } from "react";

import { Table, Row, Col, Typography, Card } from "antd";
import Icon from "@ant-design/icons";

import Avatar from "assets/Avatar2.png";
import { PayPalIcon, MoneyIcon } from "assets/svg/PaymentSbg";

import Actions from "./Actions";

const { Text } = Typography;

const paymentIcon = [PayPalIcon, MoneyIcon, PayPalIcon, MoneyIcon];

const columns = [
  {
    title: "Invoice Id",
    dataIndex: "invoiceId",
    key: "invoiceId",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.invoiceId - b.invoiceId,
  },
  {
    title: "Payment Id",
    dataIndex: "paymentId",
    key: "paymentId",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.paymentId - b.paymentId,
  },
  {
    dataIndex: "image",
    key: "image",
    render: (img) => {
      return <img src={img} alt="bag img" />;
    },
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.customer - b.customer,
  },
  {
    title: "Invoice Cost",
    dataIndex: "invoiceCost",
    key: "invoiceCost",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.invoiceCost - b.invoiceCost,
  },
  {
    title: "Expenses",
    dataIndex: "expenses",
    key: "expenses",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.expenses - b.expenses,
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.profit - b.profit,
  },
  {
    title: "Loss",
    dataIndex: "loss",
    key: "loss",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.loss - b.loss,
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
    invoiceId: "HCI1234-INV",
    paymentId: "PY-123456",
    image: Avatar,
    customer: "John Smith",
    invoiceCost: "S$100.00",
    expenses: "S$100.00",
    profit: "S$100.00",
    loss: "S$100.00",
  },
];

for (let i = 2; i <= 4; i++) {
  data.push({
    key: i,
    invoiceId: "HCI1234-INV",
    paymentId: "PY-123456",
    image: Avatar,
    customer: "John Smith",
    invoiceCost: "S$100.00",
    expenses: "S$100.00",
    profit: "S$100.00",
    loss: "S$100.00",
  });
}

const ProfitLossTable = () => {
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
        className="border rounded-top border-bottom-0"
      />
      <Card
        className="border-top-0"
        style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
      >
        <Row className="">
          <Col span={8}>
            <Text strong className="ml-5">
              Total
            </Text>
          </Col>
          <Col span={3}>
            <Text strong style={{marginLeft: "2rem"}}>4</Text>
          </Col>
          <Col span={4}>
            <Text strong style={{marginLeft: "2.2rem"}}>S$100.00</Text>
          </Col>
          <Col span={3}>
            <Text strong style={{marginLeft: ".6rem"}}>S$100.00</Text>
          </Col>
          <Col span={2}>
            <Text strong style={{marginLeft: ".9rem"}}>S$100.00</Text>
          </Col>
          <Col span={4}>
            <Text strong style={{ marginLeft: "2.2rem" }}>
              S$100.00
            </Text>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default ProfitLossTable;
