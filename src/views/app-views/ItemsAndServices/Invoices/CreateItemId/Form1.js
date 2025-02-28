import React, { useState } from "react";

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
  Card, 
  Typography
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {Title , Text} = Typography;
const Form1 = () => {
  
  return (
    <>
      <Card className="mt-3">
          
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Quotation Id">
            <Input value="HCI1234-QTN" />
          </Form.Item>


        </Col>
        <Col span={12}>
          <Form.Item
            label="Invoice Id"
          
           
          >
            <Input value="HCI1234-QTN" />
          </Form.Item>

         
        </Col>
      </Row>

     
      </Card>
    </>
  );
};
export default Form1;
