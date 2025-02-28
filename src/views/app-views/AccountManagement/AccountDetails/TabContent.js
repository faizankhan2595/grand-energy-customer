import React from "react";

import { Row, Col, Card } from "antd";

import Profile from "../../CustomerManagement/CustomerAccounts/Profile";
import InquiriesAndServices from "./InquiriesAndServices";

const TabContent = () => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Profile />
      </Col>
      <Col span={18}>
        <Card>
          <InquiriesAndServices />
        </Card>
      </Col>
    </Row>
  );
};

export default TabContent;
