import { Card, Col, Form, Input, Row, Switch } from 'antd'
import React from 'react'

function ShiftDetails() {
  return (
    <Form
      labelCol={{
        span: 16,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="vertical"
    // onValuesChange={onFormLayoutChange}

    // onFinish={finishHandler}
    >

      <Card >
        <div style={{ color: "#000B23" }} className='font-size-base font-weight-bold mb-4'>Shift Details</div>
        <Row>
          <Col span={12}>
            <Form.Item label="Shift Name" name="bankName">
              <Input />
            </Form.Item>
            <Form.Item label="Early Check-In Grace Period" name="accountNumber" >
              <Input />
            </Form.Item>
            <Form.Item label="Early Out Grace Period" name="accountNumber" >
              <Input />
            </Form.Item>
            <Form.Item label="Min Weekly Paid Overtime (Hrs)" name="accountNumber" >
              <Input />
            </Form.Item>
            <Form.Item label="Can check in out of radius?" name="accountNumber" >
              <Switch />
            </Form.Item>

          </Col>
          <Col span={12}>
          <Form.Item label="Shift Code" name="bankName">
              <Input />
            </Form.Item>
            <Form.Item label="Late Check-In Grace Period" name="branch">
              <Input />
            </Form.Item>
            <Form.Item className="w-100" label="Late Check-Out Grace Period" name="accountHolderName">
              <Input />
            </Form.Item>
            <Form.Item className="w-100" label="Max Weekly Paid Overtime (Hrs)" name="accountHolderName">
              <Input />
            </Form.Item>
            <Form.Item label="Is Night Shift?" name="accountNumber" >
              <Switch />
            </Form.Item>
          </Col>

        </Row>
      </Card>
    </Form>
  )
}

export default ShiftDetails