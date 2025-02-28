import React from "react";
import { useHistory } from "react-router-dom";

import { Tabs, Button, Row, Col , Table , Card , List , Divider , Typography , Space} from "antd";
import Icon from "@ant-design/icons";

import { InventoryManagementPageIcon } from "assets/svg/icon";
import PageHeading from "components/shared-components/PageHeading/PageHeading";

import UploadBox from "components/shared-components/UploadBox";


import { TagIcon } from "../../SvgIcons";
import AddNewVendorForm from "./AddNewVendorForm";


const {Title , Text} = Typography





const AddNewCategory = () => {

  const history = useHistory();

  const content = (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          <AddNewVendorForm/>
        </Col>
        <Col span={8}>
          <UploadBox
            title="Attachments"
            text={`Drag & drop files here or Choose Files`}
            hint="Files supported:jpg,png,jpeg,etc"
          />
        </Col>
      </Row>
  
      
  
      <Space size="middle" className={`d-flex justify-content-end`}>
        <Button style={{minWidth: "125px"}} onClick = {() => history.goBack()}>Back</Button>
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
        title="Inventory Management / Vendors / Add New Vendor"
        svg={InventoryManagementPageIcon}
      />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <div className="d-flex align-items-center">
                <Icon component={TagIcon} />
                Vendor Details
              </div>
            ),
            children: content,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default AddNewCategory;
