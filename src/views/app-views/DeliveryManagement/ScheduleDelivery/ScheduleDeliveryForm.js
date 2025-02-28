import React from "react";

import { Form, Col, Row, Input, DatePicker, Select, Typography } from "antd";


const { Title } = Typography;
const {TextArea} = Input

const ScheduleDeliveryForm = () => {
  return (
    <React.Fragment>
      <Form layout="vertical">
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Date of Delivery" name="dateOfDelivery">
              <DatePicker />
            </Form.Item>
            
            
          </Col>
          <Col span={12}>
          <Form.Item label="Delivery Time Slot" name="deliveryTimeSlot">
              <Select defaultValue="01:00 To 06:00 PM"/>
            </Form.Item>
          </Col>
        </Row>

        <Title level={4} strong className="mb-4">
              Delivery Address
            </Title>

            <Row gutter={20}>
              <Col span={12}>
              <Form.Item
              label="Block Number"
              name="blockNumber"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="012" />
            </Form.Item>
            <Form.Item
              label="Level Number"
              name="levelNumber"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="456" />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="123456" />
            </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
              label="Street Number"
              name="streetNumber"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="123" />
            </Form.Item>
            <Form.Item
              label="Unit Number"
              name="unitNumber"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="123455" />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true },
              ]}
            >
              <Input defaultValue="Singapore" />
            </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Remarks From Customer" name="remarks">
              <TextArea placeholder="select" rows={4}/>

            </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default ScheduleDeliveryForm;
