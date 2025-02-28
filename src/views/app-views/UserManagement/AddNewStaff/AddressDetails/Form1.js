import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Form1 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="Block Number">
            <Input />
          </Form.Item>
          <Form.Item label="Level Number">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Postal Code">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Street Number">
            <Input />
          </Form.Item>
          <Form.Item
            label="Unit Number"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Country">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form1 />;
