import { Col, Form, Input, Row, Select } from 'antd';
import { UserManagementFormContext } from 'context/UserManagementFormContext';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';

function Form1() {

  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);

  return (
    <Row>
        <Col span={12}>
          <Form.Item label="Assign Shift" name="bankName">
          <Select>
              <Select.Option value="shift1">Shift 1</Select.Option>
              <Select.Option value="shift2">Shift 2</Select.Option>
              <Select.Option value="shift3">Shift 3</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item label="OT Rate" name="accountNumber" >
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          
        </Col>
        <Col span={12}>
          <Form.Item label="OT Type" name="branch">
          <Select>
              <Select.Option value="Hourly">Hourly</Select.Option>
              <Select.Option value="Flat">Flat</Select.Option>
              <Select.Option value="No OT">No OT</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item className="w-100" label="Assign Roster" name="accountHolderName">
            <Input defaultValue={ctx.editFormData?.account_holder_name} />
          </Form.Item>
          
        </Col>
        
      </Row>
  )
}

export default Form1