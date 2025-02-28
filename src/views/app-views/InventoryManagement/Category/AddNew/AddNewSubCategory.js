import React from "react";

import { Tabs, Button, Row, Col , Table , Card , List , Divider , Typography, Space} from "antd";
import Icon from "@ant-design/icons";

import { InventoryManagementPageIcon } from "assets/svg/icon";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { ActivePurchaseOrdersIcon, ActiveQuotationsIcon } from "views/app-views/InventoryManagement/TabIcons";
import UploadBox from "components/shared-components/UploadBox";


import classes from "./AddNewCategory.module.css";
import AddNewSubCategoryForm from "./AddNewSubCategoryForm";
import { TagIcon } from "../../SvgIcons";
import { useHistory } from "react-router-dom";


const {Title , Text} = Typography





const AddNewCategory = () => {

  const history = useHistory();

  const content = (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          <AddNewSubCategoryForm/>
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
        title="Inventory Management / Subcategory / Add New Subcategory"
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
                Sub Category Details
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
