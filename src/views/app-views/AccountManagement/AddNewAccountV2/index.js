import React, { useState } from "react";
import { Tabs } from "antd";
import { UserManagementPageIcon } from "assets/svg/icon";
import {
  BasicDetailsIcon,
  BasicDetailsActiveIcon,
  AddressDetailsActiveIcon,
  AddressDetaisIcon,
} from "../SvgIcons";
import Icon from "@ant-design/icons";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import BasicDetailsAcc from "./BasicDetailsAcc/BasicDetailsAcc";
import AccountDetails from "../AccountDetails/AccountDetails";

const AddNewAccount = () => {
  const [currActiveKey, setCurrActiveKey] = useState("1");

  const nextHandler = () => {
    if (+currActiveKey < 2) {
      const newKey = +currActiveKey + 1;

      setCurrActiveKey(newKey.toString());
    }
  };

  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);
  };

  return (
    <React.Fragment>
      <PageHeading
        title="User Management / Add New Staff"
        svg={UserManagementPageIcon}
      />

      <Tabs
        activeKey={currActiveKey}
        onChange={tabChangeHandler}
        
      >
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center">
              <Icon
                component={
                  currActiveKey === "1"
                    ? BasicDetailsActiveIcon
                    : BasicDetailsIcon
                }
              />
              Basic Details
            </span>
          }
          key="1"
        >
          <BasicDetailsAcc onNext={nextHandler} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center">
                <Icon
                  component={
                    currActiveKey === "2"
                      ? AddressDetailsActiveIcon
                      : AddressDetaisIcon
                  }
                />
                Address Details
              </span>
          }
          key="2"
        >
           <AccountDetails />
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default AddNewAccount;
