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

import { UserManagementIcon } from "configs/svgIcons";
import plusIcon from "assets/svg/plus.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Reminder from "./Reminder";
import WorkOrder from "../../WorkdOrder/WorkOrder";
import Service from "../../ServiceTimeSheet/WorkOrder";

const tabs = [
  {
    title: "Basic Details",


  },
  {
    title: "Work Orders",
  },
  {
    title: "Service Entry Sheets",
  }


];

function ContractView() {
  const param = useParams()

  const [customerData, setCustomerData] = useState({
    reminders: []
  });

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
    <BasicDetails customerData={customerData} />,
    <WorkOrder id={param.id}/>,
    <Service id={param.id}/>,
    // <Reminder customerData={customerData} />,
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


  const getContractData = () => {
    axios
      .post(
        "/api/tc/get-contract",
        {
          id: +param.id,
        },
      )
      .then((response) => {
        let res = response.data.data;

        setCustomerData(res);



      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getContractData();
  }, [])

  return (
    <>
      <PageHeading
        title={"Contract Management / Contract List / View Contract"}
        svg={UserManagementIcon}
      />

      <Tabs
        activeKey={currActiveKey}
        size="large"
        onChange={tabChangeHandler}

      >
        {/* <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">

              {tabs[0].title}
            </span>
          }
          key="1"

        >
          {content[0]}
        </Tabs.TabPane> */}

        {
          content.map((item, index) => {
            return (
              <Tabs.TabPane
                tab={
                  <span className="d-flex align-items-center hover-color">

                    {tabs[index].title}
                  </span>
                }
                key={(index + 1).toString()}

              >
                {item}
              </Tabs.TabPane>
            )
          })
        }


      </Tabs>
    </>
  );
}

export default ContractView;
