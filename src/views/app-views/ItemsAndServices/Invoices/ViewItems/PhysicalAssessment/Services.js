import React from "react";

import { PlusIcon } from "../../../svgIcons";

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

import Icon from "@ant-design/icons"

const { Title } = Typography;
const {TextArea} = Input

const Services = (props) => {

  const nextHandler = () => {
    props.next();
  }

  const backHandler = () => {
    props.prev();
  }
  return (
    <React.Fragment>
      <Card className="pb-5">
        <Title strong level={3} className="mb-3">
          Service Details
        </Title>
        <Form layout="horizontal">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Service Start Date/Payment Date"
                name="serviceStartDate"
               
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Service Category"
                name="serviceCategory"
                
              >
                <Select />
              </Form.Item>
              <Form.Item label="Remarks">
                <TextArea rows={4}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Service Completition Date"
                name="serviceCompletitionDate"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Services"
                name="services"
                
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Title strong level={3} className="mb-3">
          Optional Services
        </Title>
        <Form layout="horizontal">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Optional Service 1"
                
               
              >
                <TextArea rows={4}/>
              </Form.Item>
              <Form.Item
                label="Price"
                
                
              >
                <Select />
              </Form.Item>
              
            </Col>
            <Col span={12}>
              <Form.Item
                label="Remarks"
                name="remarks"
              >
                <TextArea rows={4} />
              </Form.Item>
              
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="mt-2">
              <Button block type="dashed" className="d-flex align-items-center justify-content-center pt-4 pb-4">
                <Icon component={PlusIcon}/>
                <Title level={2} className="mb-0" bold style={{color: "#ED2939"}}>
                  Add More Optional Services
                </Title>
              </Button>
            </Card>

      <div className="d-flex justify-content-end actions">
        <Button onClick={backHandler}>Back</Button>
          <Button type="primary" onClick={nextHandler}>Next</Button>
      </div>
    </React.Fragment>
  );
};

export default Services;
