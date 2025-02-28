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
  Typography,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text } = Typography;
const Form2 = () => {
  return (
    <>
      <Card className="mt-3">
        <Title strong level={3}>
          Items & Services
        </Title>
        <br />
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Item Name"
              name="itemName"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Item Colour"
              name="itemColour"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Qty"
              name="qty"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <Input />
            </Form.Item>

            
          </Col>
        </Row>

        <Form.Item label="Services">
          <TextArea rows={4} />
        </Form.Item>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Discount(%)"
              name="discont"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Service Charges"
              name="serviceCharges"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input/>
            </Form.Item>
          <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default Form2;
