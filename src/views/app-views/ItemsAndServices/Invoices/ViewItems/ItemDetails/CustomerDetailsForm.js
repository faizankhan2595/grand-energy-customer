import { Form, Input , Typography , Card} from "antd";
import React from "react";

const { TextArea } = Input;
const {Title} = Typography;

const CustomerDetailsForm = () => {
  return (
    <React.Fragment>
      <Card className="mt-3">
      <Title strong level={3} className="mb-5">
        Customer Details
      </Title>
      <Form layout="vertical"  labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}>
        <Form.Item label="Customer Name" name="customerName" >
          <Input defaultValue="John Smith" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input defaultValue="+65 123458666"></Input>
        </Form.Item>
        <Form.Item label="Email Id" name="emailId">
          <Input defaultValue="john@gmail.com" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input defaultValue="510, Kampong Bahru Rd, Street 123,Singapore 456589" />
        </Form.Item>
        
      </Form>
      </Card>
    </React.Fragment>
  );
};

export default CustomerDetailsForm;
