import React, { useState , useContext} from "react";
import { UserManagementFormContext } from "context/UserManagementFormContext";
import moment from "moment";
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



const Form4 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);
  return (
    <>
      <Row>
        <Col span={12}>
        <Form.Item label="Work permit number (if applicable)" name="workPermitNumber">
            <Input defaultValue={ctx.editFormData?.work_permit_number}/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Type of Work Permit" name="typeOfWorkPermit">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Passport Number" name="passwortNumber">
            <Input defaultValue={ctx.editFormData?.passport_number}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Expiry Date" name="expiryDateWorkPermit">
            <DatePicker format="YYYY/MM/DD" defaultValue={moment(ctx.editFormData?.work_permit_exp_date)}/>
          </Form.Item>
          <Form.Item label="Expiry Date" name="expiryDatePassportNumber">
            <DatePicker format="YYYY/MM/DD" defaultValue={moment(ctx.editFormData?.passport_exp_date)}/>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form4 />;
