import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import React from 'react'
import { useState } from 'react';
import { AddressDetailsActiveIcon, AddressDetailsIcon, AttendanceManagementActiveIcon, AttendanceManagementIcon, BasicDetailsActiveIcon, BasicDetailsIcon } from 'views/app-views/UserManagement/SvgIcons'
import Locations from './Locations';
import Schedule from './Schedule';
import ShiftDetails from './ShiftDetails';
// import AttendanceManagementIcons from 'assets/svg/AttendanceManagement.svg'
import { Button, Tabs } from 'antd';
import Icon from "@ant-design/icons";


const tabs = [
  {
    title: "Basic Details",
    icon: BasicDetailsIcon,
    activeIcon: BasicDetailsActiveIcon,
  },
  {
    title: "Schedule",
    icon: AttendanceManagementIcon,
    activeIcon: AttendanceManagementActiveIcon,
  },
  {
    title: "Shift Location",
    icon: AddressDetailsIcon,
    activeIcon: AddressDetailsActiveIcon,
  },
]
function AddNewShift() {

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

  const content = [
    <ShiftDetails onNext={nextHandler} />,
    <Schedule onNext={nextHandler} />,
    <Locations onNext={nextHandler} />
  ];

  const extraBottons = <div className=''>
  <Button className='mr-4 px-5'>Back</Button>
  <Button className='px-5' type="primary" htmlType="submit">Save</Button>
</div>

  return (
    <>
      <PageHeading
        title="Attendance Management / Shift Management"
        svg={AttendanceManagementIcon}
      />

      <Tabs
        activeKey={currActiveKey}
        size="large"
        onChange={tabChangeHandler}
        tabBarExtraContent={extraBottons}
      >
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "1" ? tabs[0].activeIcon : tabs[0].icon}
              />
              {tabs[0].title}
            </span>
          }
          key="1"
        // disabled={disable[0]}
        >
          {content[0]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "2" ? tabs[1].activeIcon : tabs[1].icon}
              />
              {tabs[1].title}
            </span>
          }
          key="2"
        // disabled={disable[1]}
        >
          {content[1]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "3" ? tabs[2].activeIcon : tabs[2].icon}
              />
              {tabs[2].title}
            </span>
          }
          key="3"
        // disabled={disable[2]}
        >
          {content[2]}
        </Tabs.TabPane>
      </Tabs>
      
    </>
  )
}

export default AddNewShift