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


const Form1 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="Bank Name" name="bankName">
            <Input defaultValue={ctx.editFormData?.bank_name}/>
          </Form.Item>
          <Form.Item label="Account Number" name="accountNumber" >
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          
        </Col>
        <Col span={12}>
          <Form.Item label="Branch" name="branch">
            <Input defaultValue={ctx.editFormData?.branch_name}/>
          </Form.Item>
          <Form.Item className="w-100" label="Account Holder Name" name="accountHolderName">
            <Input defaultValue={ctx.editFormData?.account_holder_name} />
          </Form.Item>
          
        </Col>
        
      </Row>
    </>
  );
};
export default () => <Form1 />;
