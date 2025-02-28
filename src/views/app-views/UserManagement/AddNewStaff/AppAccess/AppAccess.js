import React,{useState} from "react";
import { Card, Col, Form, Row, Button , Switch } from "antd";
import Modal from "components/UI/Modal";

import './AppAccess.css'
import SuccessSubmit from "./SuccessSubmit";
const fields = ["Mobile Application" , "Web Application" , "Create Orders" , "Claim Inquiries"]



const AppAccess = () => {

  const [showSubmitHandler , setShowSubmitHandler] = useState(false);

  const submitHandler = () => {
    setShowSubmitHandler(prev => !prev);
  }

  const submitModal = (
    <Modal onClose={submitHandler}>
        
        <SuccessSubmit onClose={submitHandler}/>
      </Modal>
  );

  
  return (
    <>
    {showSubmitHandler && submitModal}
    <Card>
      <Row>
        <Col span={12} className="ml-4">
          {/* <Card> */}
          <div className="d-flex justify-content-between header mb-3">
            <p>Type</p>
            <p>Access</p>
          </div>
          {/* </Card> */}
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 , offset: 12}}
            layout="horizontal"
            className="pl-3 pr-3"
          >
            {fields.map(field => (
               <Form.Item label={field}><Switch/></Form.Item>
            ))}
          </Form>
        </Col>
      </Row>
    </Card>
    <div className="d-flex justify-content-end actions">
          <Button>Back</Button>
          <Button>Clear All</Button>
          <Button type="primary" onClick={submitHandler}>Submit</Button>
        </div>
    </>
  );
};

export default AppAccess;
