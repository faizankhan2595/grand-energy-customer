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
    title: "Payment Date",
    dataIndex: "paymentDate",
    key: "paymentDate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.paymentDate - b.paymentDate,
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    key: "paymentType",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.paymentType - b.paymentType,

    render: (icon) => {
      return <Icon component={icon} />;
    },
  },
  {
    title: "Revenue Generated",
    dataIndex: "revenueGenerated",
    key: "revenueGenerated",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.revenueGenerated - b.revenueGenerated,
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
    paymentId: "PY-123456",
    image: Avatar,
    customer: "John Smith",
    paymentDate: "23/08/2022",
    paymentType: paymentIcon[0],
    revenueGenerated: "S$100.00",
  },
];

for (let i = 2; i <= 4; i++) {
  data.push({
    key: i,
    paymentId: "PY-123456",
    image: Avatar,
    customer: "John Smith",
    paymentDate: "23/08/2022",
    paymentType: paymentIcon[i - 1],
    revenueGenerated: "S$100.00",
  });
}

const RevenueTable = () => {
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
          <Col span={17}>
            <Text strong className="ml-5">
              Total
            </Text>
          </Col>
          <Col span={7}>
            <Text strong style={{ marginLeft: "2.3rem" }}>
              S$400.00
            </Text>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default RevenueTable;
