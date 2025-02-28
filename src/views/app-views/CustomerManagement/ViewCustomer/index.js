import PageHeading from "components/shared-components/PageHeading/PageHeading";
import React from "react";
import { useState } from "react";
import {
  AddressDetailsActiveIcon,
  AddressDetailsIcon,
  AttendanceManagementActiveIcon,
  AttendanceManagementIcon,
  BasicDetailsActiveIcon,
  BasicDetailsIcon,
} from "views/app-views/UserManagement/SvgIcons";
// import AttendanceManagementIcons from 'assets/svg/AttendanceManagement.svg'
import { Button, Tabs } from "antd";
import Icon from "@ant-design/icons";
import BasicDetails from "./BasicDetails";
import JobSiteDetails from "./JobSiteDetails";
import CustomerUsers from "./CustomerUsers";
import { UserManagementIcon } from "configs/svgIcons";
import plusIcon from "assets/svg/plus.svg";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const tabs = [
  {
    title: "Basic Details",
    icon: BasicDetailsIcon,
    activeIcon: BasicDetailsActiveIcon,
  },
  {
    title: "Job Site Details",
    icon: AddressDetailsIcon,
    activeIcon: AddressDetailsActiveIcon,
  },
  {
    title: "Customer Users",
    icon: UserManagementIcon,
    activeIcon: UserManagementIcon,
  },
];

function ViewCustomer() {
  const param = useParams()
  const [cId, setCId] = useState(null);

  const [currActiveKey, setCurrActiveKey] = useState("1");
  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);
  };

  const nextHandler = () => {
    if (+currActiveKey < 3) {
      const newKey = +currActiveKey + 1;

      setCurrActiveKey(newKey.toString());
    }
  };
  const preHandler = () => {
    if (+currActiveKey <= 3) {
      const newKey = +currActiveKey - 1;

      setCurrActiveKey(newKey.toString());
    }
  };

  const content = [
    <BasicDetails onNext={nextHandler} setCId={setCId} id={param.id} />,
    <JobSiteDetails onPre={preHandler} onNext={nextHandler} cId={cId} id={param.id} />,
    <CustomerUsers onPre={preHandler} onNext={nextHandler} cId={cId} id={param.id} />,
  ];

  const extraBottons = (
    <Link to={`/app/customer-management/customer-accounts/add-new-customer-user/${param.id}`}>
      <Button className="d-flex align-items-center" type="primary" size="large">
        <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
        Add New
      </Button>
    </Link>
  );

  const [hideBasicDetail, setHideBasicDetail] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
      if(location.search){
        console.log(location.search)
          console.log("jobsite")
          setHideBasicDetail(true)
          setCurrActiveKey('2')
      }else{
          console.log("CustomerAccount")
          setHideBasicDetail(false)
      }
  }, [location.search])
  

  return (
    <>
      <PageHeading
        title={!hideBasicDetail ? "Customer Management / Customer Account / Add New Customer" : "Customer Management / Job Sites / Edit Job Site"}
        svg={UserManagementIcon}
      />

      <Tabs
        activeKey={currActiveKey}
        size="large"
        onChange={tabChangeHandler}
        tabBarExtraContent={currActiveKey == 3 && extraBottons}
      >
        {!hideBasicDetail && <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={
                  currActiveKey === "1" ? tabs[0].activeIcon : tabs[0].icon
                }
              />
              {tabs[0].title}
            </span>
          }
          key="1"
          // disabled={disable[0]}
        >
          {content[0]}
        </Tabs.TabPane>}
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={
                  currActiveKey === "2" ? tabs[1].activeIcon : tabs[1].icon
                }
              />
              {tabs[1].title}
            </span>
          }
          key="2"
          // disabled={disable[1]}
        >
          {content[1]}
        </Tabs.TabPane>
        {!hideBasicDetail && <Tabs.TabPane
          tab={
            <span
              className={`d-flex align-items-center hover-color ${
                currActiveKey === "3" ? "activePink" : ""
              }`}
            >
              <Icon
                component={
                  currActiveKey === "3" ? tabs[2].activeIcon : tabs[2].icon
                }
              />
              {tabs[2].title}
            </span>
          }
          key="3"
          // disabled={disable[2]}
        >
          {content[2]}
        </Tabs.TabPane>}
      </Tabs>
    </>
  );
}

export default ViewCustomer;
