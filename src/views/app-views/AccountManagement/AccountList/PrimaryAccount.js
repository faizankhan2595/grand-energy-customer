import React from "react";

import { Card, Typography, Row, Col } from "antd";
import profilePic from "assets/PrimaryAccount.png";

import "./PrimaryAccount.css";
const { Title, Text } = Typography;

const PrimaryAccount = () => {
  return (
    <>
      <div>
        <Title level={3}>Primary Account</Title>
        <Card style={{ background: "#FAFAFB" }} className="merge-heading-card">
          <Text>HC1234 johnsmith@gmail.com</Text>
        </Card>
        <Card style={{ background: "#FAFAFB" }}>
          <div className="d-flex flex-column text-center w-100">
            <div className="mb-3 mt-16">
              <img src={profilePic} className="rounded-circle"></img>
            </div>

            <Text strong>John Smith</Text>
            <Text className="mb-4">HC1234</Text>

            <Row>
              <Col span={11}>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Email Address</Text>
                  <Text strong>johnsmith@gmail</Text>
                </div>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Address</Text>
                  <Text strong>15 Changi Buisness Park Cres Singapore</Text>
                </div>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Birth Date</Text>
                  <Text strong>20/03/1990</Text>
                </div>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Total Orders</Text>
                  <Text strong>20</Text>
                </div>
                
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
              <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Phone Number</Text>
                  <Text strong>+65 123456789</Text>
                </div>
                <div className="d-flex flex-column text-left gender">
                  <Text secondry className="mb-1">Gender</Text>
                  <Text strong>Male</Text>
                </div>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Age Group</Text>
                  <Text strong>20-30</Text>
                </div>
                <div className="d-flex flex-column text-left mb-4">
                  <Text secondry className="mb-1">Total Inquiry</Text>
                  <Text strong>20</Text>
                </div>
                
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  );
};

export default PrimaryAccount;
