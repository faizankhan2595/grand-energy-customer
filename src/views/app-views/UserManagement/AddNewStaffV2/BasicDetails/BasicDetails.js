import React , {useContext} from "react";

import { Card , Form , Button} from "antd";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";

import classes from './BasicDetails.module.css'
import { UserManagementFormContext } from "context/UserManagementFormContext";
import { useForm } from "antd/lib/form/Form";

const BasicDetails = (props) => {

 

  const ctx = useContext(UserManagementFormContext);
  const [form] = Form.useForm();
  

  const finishHandler = (e) => {
    

    ctx.setData(e);
    console.log(ctx.formData);
    
   
    props.onNext();
    

  }
  return (
    <div>
      <Form
        form={form}
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
        <Card className="mt-3">
          <Form2 />
        </Card>
        {/* <Card className="mt-3">
          <Form3 />
        </Card> */}
        <Card className="mt-3">
          <Form4 />
        </Card>
        <Form.Item className={`d-flex justify-content-end ${classes.actions}`}>
          <Button>Back</Button>
          <Button onClick={() => form.resetFields()}>Clear All</Button>
          
          <Button type="primary" htmlType="submit">Next</Button>
        
          
        </Form.Item>

        
      </Form>
    </div>
  );
};

export default BasicDetails;
