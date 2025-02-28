import { Form, InputNumber, Select, Input , Card } from "antd";
import React from "react";

const AddNewForm = () => {
  return (
    <Card className="mt-3">
    <Form layout="vertical">
      <Form.Item
        label="Part & Material Name"
        name="partAndMaterialName"
        rules={[
          {
            required: true,
          },
        ]}
        
      >
        <Input placeholder="Part & Material Name" />
      </Form.Item>
      <Form.Item
        label="Part & Material Category"
        name="partAndMaterialCategory"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Part & Material Category" />
      </Form.Item>
      <Form.Item
        label="Reference Id"
        name="referenceId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Reference Id" />
      </Form.Item>
      <Form.Item
        label="Qty"
        name="qty"
        
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select Qty" />
      </Form.Item>
      <Form.Item
        label="Brand"
        name="brand"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Brand" />
      </Form.Item>
      <Form.Item
        label="Minimum Stock Level"
        name="brand"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Minimum Stock Level" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="brand"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Description" />
      </Form.Item>
    </Form>
    </Card>
  );
};

export default AddNewForm;
