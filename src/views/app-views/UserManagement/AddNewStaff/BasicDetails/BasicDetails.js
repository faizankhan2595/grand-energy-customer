import React from "react";
import { Card , Form , Button} from "antd";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";

import classes from './BasicDetails.module.css'
import { Link } from "react-router-dom";

const BasicDetails = () => {

  const nextHandler = () => {

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
        <div className={`d-flex justify-content-end ${classes.actions}`}>
          <Button>Back</Button>
          <Button>Clear All</Button>
          <Link to="/app/user-management/add-new-staff/employment-details">
          <Button type="primary">Next</Button>
          </Link>
          
        </div>

        
      </Form>
    </div>
  );
};

export default BasicDetails;
