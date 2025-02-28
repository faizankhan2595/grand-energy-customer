import { Form, InputNumber, Select, Input, Card, DatePicker , Col , Row } from "antd";
import React from "react";

const AddNewQuotationForm = () => {
  return (
    <Card className="mt-3">
      <Form layout="vertical">
        <Form.Item
          label="Vendor Name"
          name="vendorName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Vendor Name" />
        </Form.Item>
        <Form.Item
          label="Vendor Id"
          name="vendorId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Vendor Id" />
        </Form.Item>
        <Row gutter={20}>
        <Col span={12}>
        <Form.Item
          label="Quotation Date"
          name="vendorId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          label="Expiry Date"
          name="expiryDate"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
        </Col>
        </Row>
       
        <Form.Item
          label="Price/Unit"
          name="priceUnit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Price/Unit" />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddNewQuotationForm;
