import React, { useState } from "react";

import { Card, Form, Typography, Input, Col, Row , Button} from "antd";

import BagImg from "assets/Bag.png";
import BagImg1 from "assets/Bag1.png";
import BagImg2 from "assets/Bag2.png";
import BagImg3 from "assets/Bag3.png";
import BagImg4 from "assets/Bag4.png";

import PreviewDetail from "./PreviewDetail";
import PreviewModal from "./PreviewModal";
import Modal from "components/UI/Modal";

const { Title, Text } = Typography;

const Preview = (props) => {

  const [showModal , setShowModal] = useState(false);

  const saveHandler = () => {
    setShowModal(prev => !prev)
  }

  const backHandler = () => {
    props.prev();
  }
  return (
    <React.Fragment>

      {showModal && <Modal onClose={saveHandler}>
        <PreviewModal onClose={saveHandler}/>
        </Modal>}
      <Card>
        <Title strong level={3} className="mb-3">
          Item Details
        </Title>
        <Row gutter={20}>
          <Col span={12}>
            <PreviewDetail field="Quotation Id" value={["HCI1234-QTN"]} />
            <PreviewDetail field="Item Id" value={["HCI1234-ORD-1-1"]} />
          </Col>
          <Col span={12}>
            <PreviewDetail field="Invoice Id" value={["HCI1234-INV"]} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <PreviewDetail field="Item Type" value={["Bags"]} />
            <PreviewDetail field="Item Brand" value={["XYZ"]} />
          </Col>
          <Col span={12}>
            <PreviewDetail field="Item Name" value={["XYZ Hand Bag"]} />
            <PreviewDetail field="Item Colour" value={["Brown"]} />
          </Col>
        </Row>
        <PreviewDetail field="Qty" value={["1"]} />
        <PreviewDetail field="Service Type" value={["Repair"]} />

        <Col span={16}>
          <PreviewDetail
            field="Services"
            value={[
              "Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.",
            ]}
          />
        </Col>
        <PreviewDetail field="Price" value={["100"]} />
        <Row>
          <Col span={8}>
            <PreviewDetail field="Discount Type" value={["5%"]} />
          </Col>
          <Col span={16}>
            <PreviewDetail field="Value" value={["5"]} />
          </Col>
        </Row>
        <PreviewDetail field="Net Total" value={["95"]} />

        <Text strong>Images</Text>
        <br />
        <br />
        <div>
          <img className="mr-4" src={BagImg} />
          <img src={BagImg} />
        </div>
      </Card>

      <Card>
        <Title strong level={3} className="mb-3">
          Item Physical Assessment
        </Title>
        <Row gutter={20}>
          <Col span={12}>
            <PreviewDetail field="Date of Received" value={["06/11/2022"]} />
          </Col>
          <Col span={12}>
            <PreviewDetail field="Date of Inspection" value={["10/11/2022"]} />
          </Col>
        </Row>
        <PreviewDetail
          field="Existing conditions before service"
          value={["Furry Thread", "Damaged Lining", "Cracks"]}
          icon
        />
        <PreviewDetail
          field="Other Conditions"
          value={["Furry Thread", "Damaged Lining"]}
          icon
        />
      </Card>

      <Card>
        <Title strong level={3} className="mb-3">
          Service
        </Title>
        <Row gutter={20}>
          <Col span={12}>
            <PreviewDetail
              field="Service Start Date/Payment Date"
              value={["06/11/2022"]}
            />
          </Col>
          <Col span={12}>
            <PreviewDetail
              field="Service Completion Date"
              value={["10/11/2022"]}
            />
          </Col>
        </Row>

        <PreviewDetail field="Service Category" value={["Repair"]} />
        <PreviewDetail field="Services" value={["Repair"]} icon />
        <Col span={14}>
          <PreviewDetail
            field="Remarks"
            value={[
              "Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.",
            ]}
          />
        </Col>
      </Card>

      <Card>
      <Title strong level={3} className="mb-3">
          Images
        </Title>
        <Text>View pictures/videos of item (top, bottom, front, back, left,right etc.)</Text><br/><br/><br/>
        <div className="d-flex justify-content-between mb-5">
          <img src={BagImg1} style={{width: "244px" , height: "237px"}}/>
          <img src={BagImg2} style={{width: "244px" , height: "237px"}}/>
          <img src={BagImg3} style={{width: "244px" , height: "237px"}}/>
          <img src={BagImg4} style={{width: "244px" , height: "237px"}}/>
        </div>
        <div className="d-flex justify-content-center">
          <Title level={3} strong underline style={{color: "#0099A8"}}>View tags for service</Title>
        </div>
      </Card>

      <Card>
      <Title strong level={3} className="mb-3">
          Optional Service
        </Title>
        <Row gutter={100}>
          <Col span={12}>
          <PreviewDetail field="Optional Service1" value={["Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text."]}  />
          </Col>
          <Col span={12}>
          <PreviewDetail field="Remarks" value={["Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text."]}  />
          </Col>
        </Row>
         <PreviewDetail field="Price" value={["20"]}  />
      </Card>


      <div className="d-flex justify-content-end actions">
        <Button onClick={backHandler}>Back</Button>
        <Button style={{width: "170px"}}>Send to Customer</Button>
          <Button type="primary" onClick={saveHandler}>Save</Button>
      </div>
    </React.Fragment>
  );
};

export default Preview;
