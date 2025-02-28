import React from "react";

import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  InputNumber,
  Card,
  Tabs,
  Space,
} from "antd";
import Icon from "@ant-design/icons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { InventoryManagementPageIcon } from "assets/svg/icon";
import { PartMaterialDetailsIcon } from "../SvgIcons";
import AddNewForm from "./AddNewForm";
import ImageUpload from "views/app-views/ItemsAndServices/Quotations/ImageUpload";

// import classes from "./AddNewPartsAndMaterials.module.css";

import Upload from "components/shared-components/UploadBox";
import { useHistory } from "react-router-dom";

const { Text, Title } = Typography;



const AddNewPartsAndMaterials = () => {

  const history = useHistory();
  const content = (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          <AddNewForm />
        </Col>
        <Col span={8}>
          <Upload
            title="Attachments"
            text={`Drag & drop image here or Choose Files`}
            hint="Files supported:jpg,png,jpeg,etc"
          />
          <Card>
            <Title strong level={3} className="mb-3">
              Pricing
            </Title>
            <Form layout="vertical">
              <Form.Item
                label="Cost Price"
                name="costPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Selling Price"
                name="sellingPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
  
      <Space size="middle" className={`d-flex justify-content-end`}>
        <Button style={{minWidth: "125px"}} onClick={() => history.goBack()}>Back</Button>
        <Button style={{minWidth: "125px"}}>Clear All</Button>
  
        <Button style={{minWidth: "125px"}} type="primary">
          Save
        </Button>
      </Space>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <PageHeading
        title="Inventory Management / Parts & Materials"
        svg={InventoryManagementPageIcon}
      />
      <Tabs
        
        defaultActiveKey="1"
        items={[
          {
            label: (
              <div className="d-flex align-items-center">
                <Icon component={PartMaterialDetailsIcon} />
                Part & Material Details
              </div>
            ),
            // label: "Part & Material Details",
            key: 1,
            children: content,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default AddNewPartsAndMaterials;
