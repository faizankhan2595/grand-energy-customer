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
      <Row align='bottom'>
        <Col span={12}>
          <Form.Item label="Highest Qualification" name="highestQualification">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="University" name="university" rules={[{required: true , message: "enter your university"}]}>
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
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
        <Col span={12} >
          {/* <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item label="Field of Study" name="fieldOfStudy">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
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
export default () => <Form1 />;
