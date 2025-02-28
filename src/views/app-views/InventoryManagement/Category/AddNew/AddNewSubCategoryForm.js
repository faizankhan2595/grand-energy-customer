import { Form, InputNumber, Select, Input, Card, DatePicker , Col , Row , Typography } from "antd";
import React from "react";

const {TextArea} = Input
const {Title} = Typography

const AddNewCategoryForm = () => {
  return (
    <Card className="mt-3">
      <Title strong level={3} className="mb-4">Add New Sub Category</Title>
      <Form layout="vertical">
        <Form.Item
          label="Sub Category Name"
          name="subCategoryName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Sub Category Name" />
        </Form.Item>
        <Form.Item
          label="Category Id"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Category Id" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          
        >
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>
        
      </Form>
    </Card>
  );
};

export default AddNewCategoryForm;
