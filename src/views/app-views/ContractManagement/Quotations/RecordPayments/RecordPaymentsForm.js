import React from 'react'

import { Form , Input , Row , Col , Card , Typography  , DatePicker } from 'antd'

const {Title , Text} = Typography;
const {TextArea} = Input;

const PaymentRecordForm = ({invoice_id}) => {
  return (
    <Card className="mt-3">
        <Title strong level={3}>
          Payment Details
        </Title>
        <br />
        <Row gutter={20}>
          <Col span={12}>
            {/* <Form.Item
              label="Quotation Id"
              name="quotationId"
              
            >
              <Input value={quotation_id} disabled/>
            </Form.Item> */}
            <Form.Item
              label="Invoice Id"
              name="invoice_id"
              
            >
              <Input value={invoice_id} disabled/>
            </Form.Item>
            <Form.Item
              label="Payment Method"
              name="payment_method"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Payment Date"
              name="payment_date"
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
              name="amount"
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