import React , {useContext} from "react";
import { Card , Form , Button, Modal} from "antd";
import Form1 from "./Form1.js";
import Form2 from "./Form2.js";
import Form3 from "./Form3.js";
import Form4 from "./Form4.js";

import './AssignShift.css'
import { Link, useHistory } from "react-router-dom";

import { UserManagementFormContext } from "context/UserManagementFormContext";
import SuccessSubmit from "./SuccessSubmit.js";
import { useState } from "react";

const AssignShift = (props) => {
    const history = useHistory();
    const ctx = useContext(UserManagementFormContext);
  
    const {formData , setFormData} = props;
  
    const [showSubmitHandler, setShowSubmitHandler] = useState(false);
  
    const [val , setVal] = useState(false);
    const [firstVisit , setFirstVisit] = useState(true);
  
    const submitHandler = () => {
      
      setShowSubmitHandler((prev) => !prev);
  
      if(firstVisit){
        setFirstVisit(false);
        return ;
      }
  
      history.push(`/app/user-management/user-list`);
  
    };
  
    
    const finishHandler = (e) => {
      // console.log(e);
      
      ctx.setData(e);
      setVal(true);
      
  
  
      
      // console.log(ctx.formData);
      
    };
  
    if(val === true){
    //   const val = props.sendFormData();
      setVal(false);
      if(val === true) submitHandler();
      else history.push(`/app/user-management/user-list`);
    }
  
    const submitModal = (
      <Modal onClose={submitHandler}>
        <SuccessSubmit onClose={submitHandler} />
      </Modal>
    );
  return (
    <div>
        {showSubmitHandler && submitModal}
      <Form
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="vertical"
        // onValuesChange={onFormLayoutChange}

        onFinish={finishHandler}
      >
        <Card className="mt-3">
          <Form1 />
        </Card>
        <Card className="mt-3">
          <Form2 />
        </Card>
        <Card className="mt-3">
          <Form3 />
        </Card>
        <Card className="mt-3">
          <Form4 />
        </Card>
        
        <div className="d-flex justify-content-end actions">
          <Button>Back</Button>
          <Button>Clear All</Button>
          
          <Button type="primary" htmlType="submit">Next</Button>

          
        </div>

        
      </Form>
    </div>
  );
   
};

export default AssignShift;
