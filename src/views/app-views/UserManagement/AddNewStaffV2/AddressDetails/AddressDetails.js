import React , {useContext} from "react";
import { Link } from "react-router-dom";

import { Card , Form , Button} from "antd";
import Form1 from "./Form1";

import { UserManagementFormContext } from "context/UserManagementFormContext";

import './AddressDetails.css'

const AddressDetails = (props) => {

  const ctx = useContext(UserManagementFormContext);

  const finishHandler = (e) => {
    // console.log(e);
    ctx.setData(e);
    props.onNext();
  }
  return (
    <div>
      <Form
        labelCol={{
          span: 6,
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
        
        <div className="d-flex justify-content-end actions">
          <Button>Back</Button>
          <Button>Clear All</Button>
          
          <Button type="primary" htmlType="submit">Next</Button>

          
        </div>

        
      </Form>
    </div>
  );
   
};

export default AddressDetails;
