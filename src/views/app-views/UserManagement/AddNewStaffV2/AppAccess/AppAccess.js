import React, { useState, useContext , useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Form, Row, Button, Switch, Input } from "antd";
import Modal from "components/UI/Modal";

import "./AppAccess.css";
import { UserManagementFormContext } from "context/UserManagementFormContext";

const fields = [
  {
    label: "Mobile Application",
    name: "mobileApplication",
  },
  {
    label: "Web Application",
    name: "webApplication",
  },
  {
    label: "Chats",
    name: "chats",
  },
  {
    label: "Tasks",
    name: "tasks",
  },
];

const AppAccess = (props) => {

  const ctx = useContext(UserManagementFormContext);

  const finishHandler = (e) => {
    // console.log(e);
    ctx.setData(e);
    console.log(ctx.formData);
    props.onNext();
  }

  return (
    <>
      
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8, offset: 12 }}
        layout="horizontal"
        className="pl-3 pr-3"
        onFinish={finishHandler}
      >
        <Card>
          <Row>
            <Col span={12} className="ml-4">
              {/* <Card> */}
              <div className="d-flex justify-content-between header mb-3 pl-0">
                <p>Type</p>
                <p>Access</p>
              </div>
              {/* </Card> */}
              {fields.map((field) => (
                <Form.Item label={field.label} name={field.name} labelAlign="left">
                  <Switch />
                </Form.Item>
              ))}
            </Col>
          </Row>
        </Card>
        <div className="d-flex justify-content-end actions">
          <Button>Back</Button>
          <Button>Clear All</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AppAccess;
