import React from "react";


import { Form, Row, Col, Typography, Input , Card , Button } from "antd";


import BagImg from "assets/Bag.png";
import SneakersImg from "assets/sneakers-invoice.png"

import Form2 from "../../CreateItemId/Form2";


const { Title } = Typography;

const Item = (props) => {

  

  const nextHandler = () => {
    props.next();
    
  }
  return (
    <React.Fragment>
      <Card>
        <Title strong level={3} className="mb-3">
          Service Details
        </Title>
        <Form layout="horizontal">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Quotation Id">
                <Input defaultValue="HCI1234-QTN" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Invoice Id">
                <Input defaultValue="HCI1234-INV" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Form2 img={BagImg}/>
      

      <div className="d-flex justify-content-end actions">
        <Button>Back</Button>
          <Button type="primary" onClick={nextHandler}>Next</Button>
      </div>
    </React.Fragment>
  );
};

export default Item;
