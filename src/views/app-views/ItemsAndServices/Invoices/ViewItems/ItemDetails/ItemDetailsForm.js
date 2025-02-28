import { Form, Input , Typography , Card} from "antd";
import React from "react";

const { TextArea } = Input;
const {Title} = Typography;

const ItemDetailsForm = () => {
  return (
    <React.Fragment>
      <Card className="mt-3">
      <Title strong level={3} className="mb-5">
        Item Details
      </Title>
      <Form layout="vertical"  labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}>
        <Form.Item label="Item Id" name="itemId" rules={[{ required: true }]}>
          <Input defaultValue="HCI1234-ORD-(1-1)" />
        </Form.Item>
        <Form.Item label="Invoice Id">
          <Input defaultValue="HCI1234-INV"></Input>
        </Form.Item>
        <Form.Item label="Item Name" name="itemName">
          <Input defaultValue="XYZ Hand Bag" />
        </Form.Item>
        <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
          <Input defaultValue="ABC" />
        </Form.Item>
        <Form.Item label="Item Colour" name="itemColour" rules={[{ required: true }]}>
          <Input defaultValue="Brown" />
        </Form.Item>
        <Form.Item label="Qty" name="qty" rules={[{ required: true }]}>
          <Input defaultValue="1" />
        </Form.Item>
        <Form.Item label="Services" name="services">
          <TextArea
            rows={4}
            defaultValue="Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text.Loreum ipsum is dummy text."
          />
        </Form.Item>
      </Form>
      </Card>
    </React.Fragment>
  );
};

export default ItemDetailsForm;
