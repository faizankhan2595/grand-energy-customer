import React from "react";

import { Col, Row, Table, Card, Typography, Select, Progress } from "antd";

import InquiriesTable from "./InquiriesTable";
import InquiryChannels from "./InquiryChannels";

import './Inquiries.css'

const { Title, Text } = Typography;

const columns = [
  {
    title: "Inquiry",
    dataIndex: "inquiry",
    key: "inquiry",
  },
  {
    title: "",
    dataIndex: "",
    key: "",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },
  {
    title: "Rotting Time",
    dataIndex: "rottingTime",
    key: "rottingTime",
  },
];

const dataSource = [
  {
    key: "1",
    inquiry: "General Inquiry",
    startDate: "26/08/2022",
    orderDate: "26/08/2022",
    rottingTime: "10 Days",
  },
  {
    key: "2",
    inquiry: "Service Progress",
    startDate: "26/08/2022",
    orderDate: "26/08/2022",
    rottingTime: "10 Days",
  },
  {
    key: "3",
    inquiry: "Pickup Support",
    startDate: "26/08/2022",
    orderDate: "26/08/2022",
    rottingTime: "10 Days",
  },
  {
    key: "4",
    inquiry: "Delivery Support",
    startDate: "26/08/2022",
    orderDate: "26/08/2022",
    rottingTime: "10 Days",
  },
];

const Inquiries = () => {
  return (
    <Row gutter={20}>
      <Col span={16}>
        <Card>
          <div className="d-flex justify-content-between mb-3">
            <Title strong level={3}>Inquiries</Title>
            <Select
              className="d-flex align-items-center "
              placeholder="This Month"
            />
          </div>

          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
      </Col>
      <Col span={8}>
        <Card p>
          <div className="d-flex justify-content-between mb-4">
            <Title strong level={3} >Inquiry Channels</Title>
            <Select
              className="d-flex align-items-center "
              placeholder="This Month"
            />
          </div>
          <div className="ml-4 mr-4">
            <div className="d-flex justify-content-between">
              <Text strong>Whatsapp</Text>
              <Text style={{color: "#FFB200"}}>65,376</Text>
            </div>
            <Progress className="whatsapp" percent={70} showInfo={false}/>
            <div className="d-flex justify-content-between mt-4">
              <Text strong>Email</Text>
              <Text style={{color: "#4339F2"}}>12,109</Text>
            </div>
            <Progress  className="email" percent={55} showInfo={false}/>
            <div className="d-flex justify-content-between mt-4">
              <Text strong>Phone Call</Text>
              <Text style={{color: "#02A0FC"}}>132,645</Text>
            </div>
            <Progress className="phone_call" percent={85} showInfo={false}/>
            <div className="d-flex justify-content-between mt-4">
              <Text strong>Store Visits</Text>
              <Text style={{color: "#ED2939"}}>100,429</Text>
            </div>
            <Progress className="store_visits" percent={65} showInfo={false}/>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Inquiries;
