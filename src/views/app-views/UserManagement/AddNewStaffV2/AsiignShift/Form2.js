import { Col, Form, Input, Row, Switch } from 'antd';
import { UserManagementFormContext } from 'context/UserManagementFormContext';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';

function Form2() {

  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);
  return (
    <>
      <div style={{ color: "#000B23" }} className='font-size-base font-weight-bold mb-4'>Shift Details</div>
      <Row>
        <Col span={12}>
          <Form.Item label="Early Check-In Grace Period" name="bankName">
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          <Form.Item label="Early Check-In Grace Period" name="accountNumber" >
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          <Form.Item label="Min Weekly Paid Overtime (Hrs)" name="accountNumber" >
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          <Form.Item label="Can check in out of radius?" name="accountNumber" >
            <Switch/>
          </Form.Item>

        </Col>
        <Col span={12}>
          <Form.Item label="Late Check-In Grace Period" name="branch">
            <Input defaultValue={ctx.editFormData?.account_number} />
          </Form.Item>
          <Form.Item className="w-100" label="Late Check-Out Grace Period" name="accountHolderName">
            <Input defaultValue={ctx.editFormData?.account_holder_name} />
          </Form.Item>
          <Form.Item className="w-100" label="Max Weekly Paid Overtime (Hrs)" name="accountHolderName">
            <Input defaultValue={ctx.editFormData?.account_holder_name} />
          </Form.Item>

        </Col>

      </Row>
    </>
  )
}

export default Form2