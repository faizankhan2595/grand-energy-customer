import React , {useState} from "react";
import { Link } from "react-router-dom";

import { Form, Card, Button, Typography, Col, Row } from "antd";
import Icon from '@ant-design/icons';

// import { PlusIcon } from "../svgIcons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import Form1 from "./Form1";
import CreateItemIdModal from "./CreateItemIdModal";
// import Form2 from "./Form2";
// import ImageUpload from "./ImageUpload";
import Modal from "components/UI/Modal";
import Form2 from "./Form2";
// import QuotationModal from "./QuotationModal";

import BagImg from "assets/Bag.png";
import SneakersImg from "assets/sneakers-invoice.png"



const { Title, Text } = Typography;

const AddNewQuotation = () => {
  const [form] = Form.useForm();
   
  const [showModal , setShowModal] = useState(false);

  const createIdHandler = () => {
    setShowModal(prev => !prev);
  }

  
    
  
  return (
    <React.Fragment>
      {showModal && <CreateItemIdModal onClose={createIdHandler}/>}
      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="Items & Services / Invoices / Create Item Id"
      />

      <Form
        layout="horizontal"

        // onValuesChange={onFormLayoutChange}
      >
        <Form1 />
        <Form2 img={BagImg}/>
        <Form2 img={SneakersImg}/>

        {/* <Row gutter={20}>
          <Col span={16}>
            <Form2 />
            <Card className="mt-2">
              <Button block type="dashed" className="d-flex align-items-center justify-content-center pt-4 pb-4">
                <Icon component={PlusIcon}/>
                <Title level={2} className="mb-0" bold style={{color: "#ED2939"}}>
                  Add New Items And Services
                </Title>
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <ImageUpload />
          </Col>
        </Row> */}
      </Form>

      <div className="d-flex justify-content-end actions">
        <Button>Back</Button>
       
        
          <Button type="primary" onClick = {createIdHandler}>Save</Button>
        
      </div>
    </React.Fragment>
  );
};

export default AddNewQuotation;
