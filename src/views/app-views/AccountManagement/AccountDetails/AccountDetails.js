import React from "react";

import { Col, Row, Tabs, Button } from "antd";
// import Icon from '@ant-design/icons'

import Nav from "./Tabs";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import ExtraContent from "./ExtraContent";
import TabContent from "./TabContent";

import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import { FinanceIcon , InquiryListIcon , ItemsAndServicesIcon } from "assets/svg/icon";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';



// const icons = [
// <Icon component={ItemsAndServicesIcon}/>,
// <Icon component={InquiryListIcon}/>,
// <Icon component={FinanceIcon}/>,
// ]

const AccountDetails = () => {
  return (
    <>
      {/* Heading */}
      <div>
        <PageHeading
          icon={UserManagementIcon}
          title="Account Management / Account Details"
        />
      </div>

      

      <Tabs defaultActiveKey="1" centered tabBarExtraContent={<ExtraContent />}>
        <Tabs.TabPane tab="Items & Services" key="1">
          <TabContent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inquiry List" key="2">
          <TabContent/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Finances" key="3">
          <TabContent/>
        </Tabs.TabPane>
        <Button>Search</Button>
      </Tabs>
    </>
  );
};

export default AccountDetails;
