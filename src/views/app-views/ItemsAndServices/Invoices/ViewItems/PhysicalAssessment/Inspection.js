import React from "react";

import {
  Typography,
  Card,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Button
} from "antd";

const { Title } = Typography;

const Inspection = (props) => {

  const nextHandler = () => {
    props.next();
  }

  const backHandler = () => {
    props.prev();
  }
  return (
    <React.Fragment>
      <Card>
        <Title strong level={3} className="mb-3">
          Item Physical Assesment
        </Title>
        <Form layout="horizontal">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Date of Received"
                name="dateOfReceived"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Existing conditions before service"
                name="existionConditionsBeforeService"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select />
              </Form.Item>
              <Form.Item label="Other Conditions">
                <Select />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Inspection"
                name="dateOfInspection"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <div className="d-flex justify-content-end actions">
        <Button onClick={backHandler}>Back</Button>
          <Button type="primary" onClick={nextHandler}>Next</Button>
      </div>
    </React.Fragment>
  );
};

export default Inspection;
