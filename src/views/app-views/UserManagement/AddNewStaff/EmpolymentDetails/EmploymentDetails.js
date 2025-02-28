import React from "react";
import { Card , Form , Button} from "antd";
import Form1 from "./Form1";

import './EmploymentDetails.css'
import { Link } from "react-router-dom";

const EmploymentDetails = () => {
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
        
        <div className="d-flex justify-content-end actions">
          <Button>Back</Button>
          <Button>Clear All</Button>
          <Link to="/app/user-management/add-new-staff/address-details">

          <Button type="primary">Next</Button>
          </Link>
        </div>

        
      </Form>
    </div>
  );
   
};

export default EmploymentDetails;
