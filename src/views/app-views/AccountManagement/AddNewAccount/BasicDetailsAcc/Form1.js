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
          <Form.Item
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number",
                },
              ]}
            >
              <Input maxLength={10} type="number" />
            </Form.Item>

            <Form.Item label="Country">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>

            
            
            
          </Col>
          <Col span={12}>

          <Form.Item
              label="Email Id"
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
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            
            <Form.Item label="Gender">
              <Radio.Group>
                <Radio value="male"> Male </Radio>
                <Radio value="female"> Female </Radio>
                <Radio value="other"> Other </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        

    </>
  );
};
export default () => <Form1 />;
