import React from 'react'

import { Form , Input , Row , Col , Card , Typography  , DatePicker } from 'antd'

const {Title , Text} = Typography;
const {TextArea} = Input;

const PaymentRecordForm = () => {
  return (
    <Card className="mt-3">
        <Title strong level={3}>
          Payment Details
        </Title>
        <br />
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Quotation Id"
              name="quotationId"
              
            >
              <Input value="HCI1234-QTN"/>
            </Form.Item>
            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Payment Date"
              name="paymentDate"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <DatePicker/>
            </Form.Item>
            <Form.Item
              label="Amount Collected"
              name="amountCollected"
              
            >
              <Input />
            </Form.Item>

            
          </Col>
        </Row>

        <Form.Item label="Remarks" name="remarks">
          <TextArea rows={4} />
        </Form.Item>

       
      </Card>
  )
}

export default PaymentRecordForm