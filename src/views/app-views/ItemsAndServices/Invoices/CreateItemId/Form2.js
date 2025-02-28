import React from "react";

import { Row, Col, Typography , Form , Card , Input , Button  } from "antd";
import Icon from "@ant-design/icons";




import Preview from "components/shared-components/Preview";

const { Title, Text } = Typography;
const {TextArea} = Input;

const Form2 = (props) => {
  return (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          <Card className="mt-3">
            {/* Items and Services */}
            <Title strong level={3}>
              Items & Services
            </Title>
            <br />
            <Row gutter={20}>
              <Col span={12}>
              <Form.Item
                label="Item Id"
                name="itmeId"
                rules={[
                  {
                    required: true,
                    message: "required",
                  },
                ]}
              >
                <Input default="HCI1234-ORD-1-1" />
              </Form.Item>
              </Col>

              <Col span={12}></Col>
              
              <Col span={12}>
                <Form.Item
                  label="Item Name"
                  name="itemName"
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                >
                  <Input default="XYZ Hand Bag" />
                </Form.Item>
                <Form.Item
                  label="Item Colour"
                  name="itemColour"
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                >
                  <Input default="Brown" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                >
                  <Input default="ABC" />
                </Form.Item>
                <Form.Item
                  label="Qty"
                  name="qty"
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                >
                  <Input value="1" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Services">
              <TextArea
                rows={4}
                default="Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text."
              />
            </Form.Item>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input default="100.00"/>
                </Form.Item>
                <Form.Item
                  label="Discount(%)"
                  name="discont"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input default="0" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Service Charges"
                  name="serviceCharges"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input default="0"/>
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input default="0"/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          
        </Col>
        <Col span={8}>
          {/* <Card className="mt-3">
          <Title strong level={3}>Images</Title>
          <div className={`d-flex justify-content-around p-5 ${classes.img}`}>
            <img src={props.img} alt="bag Image" />
            <img src={props.img} alt="bag Image" />
          </div>
          </Card> */}
          <Preview>
            <img src={props.img} alt="bag image"/>
            <img src={props.img} alt="bag image"/>
          </Preview>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Form2;
