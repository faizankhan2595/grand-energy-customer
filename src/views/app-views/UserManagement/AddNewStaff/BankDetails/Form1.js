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
          <Form.Item label="Bank Name">
            <Input />
          </Form.Item>
          <Form.Item label="Account Number">
            <Input />
          </Form.Item>
          
        </Col>
        <Col span={12}>
          <Form.Item label="Branch">
            <Input />
          </Form.Item>
          <Form.Item label="Account Holder Name">
            <Input />
          </Form.Item>
          
        </Col>
        
      </Row>
    </>
  );
};
export default () => <Form1 />;
