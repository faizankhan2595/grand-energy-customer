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
const Form2 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="Role">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Joining Date"
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
            label="Department"
            rules={[
              {
                required: true,
                message: "Field Required",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Confirmation Date"
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
    </>
  );
};
export default () => <Form2 />;
