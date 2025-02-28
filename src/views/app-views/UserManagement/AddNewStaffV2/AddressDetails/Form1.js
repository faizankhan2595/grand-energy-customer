import React, { useState , useContext } from "react";

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
          <Form.Item label="Block Number" name="blockNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Level Number" name="levelNumber">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Postal Code" name="postalCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Street Number" name="streetNumber">
            <Input />
          </Form.Item>
          <Form.Item
            label="Unit Number"
            name="unitNumber"
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
          <Form.Item label="Country" name="country">
          <Select>
              <Select.Option value="singapore">Singapore</Select.Option>
              <Select.Option value="malaysia">Malaysia</Select.Option>
              <Select.Option value="india">India</Select.Option>
              <Select.Option value="myanmar">Myanmar</Select.Option>
              <Select.Option value="china">China</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form1 />;
