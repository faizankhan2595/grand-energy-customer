import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import { Button, Form, Modal, Select, Tabs } from "antd";
import Icon from "@ant-design/icons";

import {
  BasicDetailsIcon,
  BankDetailsIcon,
  AddressDetaisIcon,
  AppAccessIcon,
  UploadDocumentsIcon,
  EmploymentDetailsIcon,
  BasicDetailsActiveIcon,
  BankDetailsActiveIcon,
  AddressDetailsActiveIcon,
  AppAccessActiveIcon,
  UploadDocumentsActiveIcon,
  EmploymentDetailsActiveIcon,
  AssignShiftActiveIcon,
  AssignShiftIcon
} from "views/app-views/UserManagement/SvgIcons";
import { UserManagementPageIcon } from "assets/svg/icon";
import {Successfully}  from "../../../../../src/configs/svgIcons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import BasicDetails from "./BasicDetails/BasicDetails";
import EmploymentDetails from "./EmpolymentDetails/EmploymentDetails";
import AddressDetails from "./AddressDetails/AddressDetails";
import BankDetails from "./BankDetails/BankDetails";
import UploadDocuments from "./UploadDocuments/UploadDocuments";
import AppAccess from "./AppAccess/AppAccess";
import { UserManagementFormContext } from "context/UserManagementFormContext";
import AssignShift from "./AsiignShift/AssignShift";
import SuccessSubmit from "./AsiignShift/SuccessSubmit";

const tabs = [
  {
    title: "Basic Details",
    icon: BasicDetailsIcon,
    activeIcon: BasicDetailsActiveIcon,
  },
  {
    title: "Employment/Education Details",
    icon: EmploymentDetailsIcon,
    activeIcon: EmploymentDetailsActiveIcon,
  },
  {
    title: "Address Details",
    icon: AddressDetaisIcon,
    activeIcon: AddressDetailsActiveIcon,
  },
  {
    title: "Bank Details",
    icon: BankDetailsIcon,
    activeIcon: BankDetailsActiveIcon,
  },
  {
    title: "Upload Documents",
    icon: UploadDocumentsIcon,
    activeIcon: UploadDocumentsActiveIcon,
  },
  {
    title: "App Access",
    icon: AppAccessIcon,
    activeIcon: AppAccessActiveIcon,
  },
  {
    title: "Assign Shift",
    icon: AssignShiftIcon,
    activeIcon: AssignShiftActiveIcon,
  },
];

const AddNewStaff = () => {
  const [currActiveKey, setCurrActiveKey] = useState("1");
  const [disable, setDisable] = useState([false, true, true, true, true, true, true]);

  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);
  };

  const nextHandler = () => {
    // if (currKey === "6") {
    //   return;
    // }
    const arr = disable;
    arr[+currActiveKey] = false;
    setDisable(arr);
    console.log(disable);
    setCurrActiveKey((prev) => {
      let num = +prev;
      console.log(num);

      if (num < 7) {
        num = num + 1;
      }

      return num.toString();
    });
  };

  const ctx = useContext(UserManagementFormContext);

  const sendFormData = async () => {
    console.log(ctx.formData);
    // console.log(formData);

    const formData = ctx.formData;

    let finalFormData = {
      fullname: formData.fullName,
      email: formData.emailId,
      phone: formData.phoneNumber,
      age_group: formData.ageGroup,
      dob: moment(formData.dateOfBirth).format("YYYY-MM-DD"),
      gender: formData.gender,
      marital_status: formData.martialStatus,
      race: formData.race,
      religion: formData.religion,
      joining_date: moment(formData.joiningDate).format("YYYY-MM-DD"),
      confirmation_date: moment(formData.confirmationDate).format("YYYY-MM-DD"),
      residency_status: formData.residencyStatus,
      nationality: formData.nationality,
      ic_number: formData.icNumber,
      work_permit_number: formData.workPermitNumber,
      work_permit_exp_date: moment(formData.expiryDateWorkPermit).format(
        "YYYY-MM-DD"
      ),
      passport_number: formData.passwortNumber,
      passport_exp_date: moment(formData.expiryDatePassportNumber).format(
        "YYYY-MM-DD"
      ),
      highest_qualifications: formData.highestQualification,
      school_name: formData.university,
      field_of_study: formData.fieldOfStudy,
      course_start_date: "2012-12-12",
      course_end_date: moment(formData.endDate).format("YYYY-MM-DD"),
      bank_name: formData.bankName,
      branch_name: formData.branch,
      account_number: formData.accountNumber,
      account_holder_name: formData.accountHolderName,
      website_access: !!formData.webApplication,
      app_access: !!formData.mobileApplication,
      create_order_access: !!formData.createOrders,
      claim_inquire_access: !!formData.claimInquiries,
      department_id: +formData.department,
      role_id: +formData.role,
      designation_id: 1,
      addresses: [
        {
          address_type: "home",
          block_no: formData.blockNumber,
          unit_no: formData.unitNumber,
          level_no: formData.levelNumber,
          street_name: formData.streetNumber,
          pin_code: formData.postalCode,

          country: formData.country,
        },
      ],
    };
    // console.log(finalFormData);

    // finalFormData = {
    //   fullname: formData.fullName,
    //   email: formData.emailId,
    //   phone: formData.phoneNumber,
    //   age_group: formData.ageGroup,
    //   dob: moment(formData.dateOfBirth).format("YYYY-MM-DD"),
    //   gender: formData.gender,
    //   website_access: !!formData.webApplication,
    //   app_access: !!formData.mobileApplication,
    //   create_order_access: !!formData.createOrders,
    //   claim_inquire_access: !!formData.claimInquiries,
    // }

    console.log(finalFormData);

    const data = {
      fullname: "Ankit",
      email: "test@gmail.com",
      phone: "+917612329876",
      age_group: "20-30",
      dob: "1995-09-12",
      gender: "male",
      marital_status: "married",
      race: "Asian",
      religion: "Islam",
      joining_date: "2021-10-15",
      confirmation_date: "2021-10-14",
      residency_status: "valid",
      nationality: "Indian",
      ic_number: "1234AB",
      work_permit_number: "123AB",
      work_permit_exp_date: "2035-01-01",
      passport_number: "134AB",
      passport_exp_date: "2035-01-01",
      highest_qualifications: "Masters",
      school_name: "Oxford University",
      field_of_study: "MBA",
      course_start_date: "2010-05-01",
      course_end_date: "2014-06-01",
      bank_name: "HSBC",
      branch_name: "Chandini Chowk",
      account_number: "123457899",
      account_holder_name: "John Doe",
      website_access: true,
      app_access: true,
      create_order_access: false,
      claim_inquire_access: false,
      department_id: 1,
      role_id: 1,
      designation_id: 1,
      addresses: [
        {
          address_type: "home",
          block_no: "123/1",
          unit_no: "123/2",
          level_no: "123/3",
          street_name: "Tulsipur",
          pin_code: "753008",
          state: "Odisha",
          country: "India",
        },
      ],
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/add-user`,
        finalFormData
      );
      // console.log(response.ok);
      // console.log(response.data);
      return true;
    } catch (err) {
      Modal.warning({
        title: "User Not Created",
        content: err.message
      })

      return false;
    }
  };

  const content = [
    <BasicDetails onNext={nextHandler} />,
    <EmploymentDetails onNext={nextHandler} />,
    <AddressDetails onNext={nextHandler} />,
    <BankDetails onNext={nextHandler} />,
    <UploadDocuments onNext={nextHandler} />,
    <AppAccess onNext={nextHandler} />,
    <AssignShift sendFormData={sendFormData} />
  ];

  const [ischangeEmployeeStatusModalOpen, setIsChangeEmployeeStatusModalOpen] = useState(false);
  const [isEmployeeStatusChanged, setIsEmployeeStatusChanged] = useState(false);
  const [isDeactivateAccountModalOpen, setIsDeactivateAccountModalOpen] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const showEmployeeStatusChangeModal = () => {
    setIsChangeEmployeeStatusModalOpen(true);
  };
  const showDeactivateAccount = () => {
    setIsDeactivateAccountModalOpen(true);
  };

  const handleEmployeeStatusChanged = () => {
    setIsChangeEmployeeStatusModalOpen(false);
    setIsEmployeeStatusChanged(true);
  };

  const handleDeactivateAccount = () => {
    setIsDeactivateAccountModalOpen(false);
    setIsDeactivated(true);
  };

  const handleCancel = () => {
    setIsChangeEmployeeStatusModalOpen(false);
    setIsEmployeeStatusChanged(false)
    setIsDeactivated(false)
  };


  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <PageHeading
          title="User Management / Add New Staff"
          svg={UserManagementPageIcon}
        />
        <div className="d-flex align-items-center">
          <Button

            className="d-flex align-items-center mr-4"
            danger
            onClick={showEmployeeStatusChangeModal}
          // size="large"
          >
            Change Employee Status
          </Button>
          <Modal centered visible={ischangeEmployeeStatusModalOpen} okText ='Save' cancelText='Cancel' onOk={handleEmployeeStatusChanged} onCancel={handleCancel}>
            <div style={{color:"#000B23"}} className="font-size-md font-weight-bold mb-4">Change Employee Status</div>
            <Form layout="vertical">
              <Form.Item className="font-size-xs" label="Working Status" name="workingStatus">
                <Select>
                  <Select.Option value="Resigned">Resigned</Select.Option>
                  <Select.Option value="Resign_without_notice">Resign without notice</Select.Option>
                  <Select.Option value="Terminated">Terminated</Select.Option>
                  <Select.Option value="Contract_end">Contract end</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          <Modal centered visible={isEmployeeStatusChanged} footer={[null]} onCancel={handleCancel}>
            <SuccessSubmit icon={Successfully} title="Employee Status Change Successfully!" desc='Employee status changed to terminated.'/>
          </Modal>
          <Button
            className="d-flex align-items-center"
            danger
            onClick={showDeactivateAccount}
          // size="large"
          >
            Deactivate Account
          </Button>
          <Modal centered visible={isDeactivateAccountModalOpen} okText ='Yes, confirm' cancelText='No, Cancel' onOk={handleDeactivateAccount} onCancel={handleCancel}>
            <div style={{color:"#000B23"}} className="font-size-md font-weight-bold mb-2">Change Employee Status</div>
            <p style={{color:'#72849A'}} className='m-0 mt-2 font-size-base font-weight-normal mb-3'>Staff ID #TC-1234 will be deleted from system</p>
          </Modal>
          <Modal centered visible={isDeactivated} footer={[null]} onCancel={handleCancel}>
            <SuccessSubmit icon={Successfully} title="Staff Deactivated Successfully!" desc='Staff ID #TC-1234 deleted.'/>
          </Modal>
        </div>
      </div>

      <Tabs
        activeKey={currActiveKey}
        size="large"
        onChange={tabChangeHandler}
      // items={tabs.map((item, i) => {
      //   const id = String(i + 1);

      //   return {
      //     label: (
      //       // <div onClick={nextHandler}>
      //       <span className="d-flex align-items-center hover-color">
      //         <Icon
      //           component={currActiveKey === id ? item.activeIcon : item.icon}
      //         />
      //         {item.title}
      //       </span>
      //       // </div>
      //     ),
      //     key: id,
      //     disabled: disable[i],
      //     children: content[i],
      //   };
      // })}
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
          disabled={disable[0]}
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
          disabled={disable[1]}
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
          disabled={disable[2]}
        >
          {content[2]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "4" ? tabs[3].activeIcon : tabs[3].icon}
              />
              {tabs[3].title}
            </span>
          }
          key="4"
          disabled={disable[3]}
        >
          {content[3]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "5" ? tabs[4].activeIcon : tabs[4].icon}
              />
              {tabs[4].title}
            </span>
          }
          key="5"
          disabled={disable[4]}
        >
          {content[4]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "6" ? tabs[5].activeIcon : tabs[5].icon}
              />
              {tabs[5].title}
            </span>
          }
          key="6"
          disabled={disable[5]}
        >
          {content[5]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="d-flex align-items-center hover-color">
              <Icon
                component={currActiveKey === "7" ? tabs[6].activeIcon : tabs[6].icon}
              />
              {tabs[6].title}
            </span>
          }
          key="7"
          disabled={disable[6]}
        >
          {content[6]}
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default AddNewStaff;
