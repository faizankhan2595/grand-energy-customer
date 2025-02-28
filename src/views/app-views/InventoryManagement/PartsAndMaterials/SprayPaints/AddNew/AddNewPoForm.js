import { Form, InputNumber, Select, Input , Card, DatePicker } from "antd";
import React from "react";

const AddNewPoForm = () => {
  return (
    <Card className="mt-3">
    <Form layout="vertical">
      <Form.Item
        label="PO Reference Number "
        name="poReferenceNumber"
        rules={[
          {
            required: true,
          },
        ]}
        
      >
        <Input defaultValue="HC-123456" />
      </Form.Item>
      <Form.Item
        label="Quotation Id"
        name="quotationId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue="HC-123456" />
      </Form.Item>
      <Form.Item
        label="Vendor Name"
        name="vendorName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue="John Smith" />
      </Form.Item>
      <Form.Item
        label="Vendor Company"
        name="vendorCompany"
        
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue="ABC" />
      </Form.Item>
      <Form.Item
        label="Purchase Date"
        name="purchaseDate"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
      
    </Form>
    </Card>
  );
};

export default AddNewPoForm;
