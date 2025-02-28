import React, { useState , useContext} from "react";
import { UserManagementFormContext } from "context/UserManagementFormContext";
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



const Form3 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext)
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="Residency Status" name="residencyStatus">
            <Select defaultValue={ctx.editFormData?.residency_status}>
              <Select.Option value="home">Home</Select.Option>
              <Select.Option value="office">Office</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="IC Number" name="icNumber">
            <Select defaultValue={ctx.editFormData?.ic_number}>
              <Select.Option value="1234AB">1234AB</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nationality" name="nationality">
            <Select defaultValue={ctx.editFormData?.nationality}>
              <Select.Option value="indian">Indian</Select.Option>
              <Select.Option value="singaporean">Singaporean</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form3 />;
