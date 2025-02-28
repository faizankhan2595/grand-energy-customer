import React from "react";

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
  Card,
  Row,
  Col,
  Typography
} from "antd";
import Icon from "@ant-design/icons"
import { PlusOutlined } from "@ant-design/icons";
import { SingaporeFlagIcon } from "../../SvgIcons";

const { TextArea } = Input;
const { Title } = Typography;

const AddNewVendorForm = () => {
  return (
    <Card className="mt-3">
      <Title strong level={3} className="mb-4">
        Add New Category
      </Title>
      <Form layout="vertical">
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Type">
          <Radio.Group>
            <Radio value="individual"> Individual </Radio>
            <Radio value="buisness"> Business </Radio>
          </Radio.Group>
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
          <Input placeholder="Vendor Name" />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          label="Email Id"
          name="emailId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Email Id" />
        </Form.Item>
        <Form.Item
          label="UEN Number"
          name="uenNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="UEM Number" />
        </Form.Item>
        <Title strong level={4}>Address</Title>

        <Row gutter={20}>
          <Col span={12}>
          <Form.Item
          label="Block Number"
          name="blockNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Block Number" />
        </Form.Item>
          <Form.Item
          label="Level Number"
          name="levelNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Level Number" />
        </Form.Item>
          <Form.Item
          label="Postal Code"
          name="postalCode"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Postal Code" />
        </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
          label="Street Number"
          name="streetNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Street Number" />
        </Form.Item>
        <Form.Item
          label="Unit Number"
          name="unitNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Unit Number" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue="Singapore" prefix={<Icon component={SingaporeFlagIcon}/>} />
        </Form.Item>
          </Col>
        </Row>
        </Form>
    </Card>
  );
};

export default AddNewVendorForm;
