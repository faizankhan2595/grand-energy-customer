import React from "react";

import { Link } from "react-router-dom";

import { Card, Form, Button } from "antd";

import Form1 from "./Form1";
import "./BasicDetailsAcc.css";

const BasicDetailsAcc = () => {
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
          <Link to="/app/account-management/add-new-account/address-details">
            <Button type="primary">Next</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default BasicDetailsAcc;
