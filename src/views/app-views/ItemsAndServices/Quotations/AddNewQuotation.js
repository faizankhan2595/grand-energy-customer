import React , {useState} from "react";
import { Link } from "react-router-dom";

import { Form, Card, Button, Typography, Col, Row } from "antd";
import Icon from '@ant-design/icons';

import { PlusIcon } from "../svgIcons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import Form1 from "./Form1";
import Form2 from "./Form2";
import ImageUpload from "./ImageUpload";
import Modal from "components/UI/Modal";
import QuotationModal from "./QuotationModal";



const { Title, Text } = Typography;

const AddNewQuotation = () => {
  const [form] = Form.useForm();
   
  const [showModal , setShowModal] = useState(false);

  const saveQuotationHandler = () => {
    setShowModal(prev => !prev);
  }

  const saveQuotaionModal = (
    <Modal onClose = {saveQuotationHandler}>
      <QuotationModal/>
    </Modal>
  )
  return (
    <React.Fragment>
      {showModal && saveQuotaionModal}
      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="Items & Services / Quotations / Add New Quotation"
      />

      <Form
        layout="horizontal"

        // onValuesChange={onFormLayoutChange}
      >
        <Form1 />

        <Row gutter={20}>
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
        </Row>
      </Form>

      <div className="d-flex justify-content-end actions">
        <Button>Back</Button>
        <Button>Clear All</Button>
        
          <Button type="primary"  onClick={saveQuotationHandler}>Save</Button>
        
      </div>
    </React.Fragment>
  );
};

export default AddNewQuotation;
