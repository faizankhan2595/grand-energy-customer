import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Row,
  Col,
  Card, 
  Typography
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {Title , Text} = Typography;
const Form1 = () => {
  
  return (
    <>
      <Card className="mt-3">
          <Title strong level={3}>
            Service Details
          </Title>
          <br/>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Quotation Id">
            <Input value={"HCI1234-QTN"} />
          </Form.Item>

          <Form.Item
            label="Pickup Date"
            rules={[
              {
                required: true,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Customer Name"
            rules={[
              {
                required: true,
                message: "Please input your email-id!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Pickup Time Slot"
            rules={[
              {
                required: true,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Pickup Address">
        <TextArea rows={4} />
      </Form.Item>

      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Quotation Date"
            name="quotationDate"
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      </Card>
    </>
  );
};
export default Form1;
