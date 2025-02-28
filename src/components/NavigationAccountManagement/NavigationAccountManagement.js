import Navigation from "components/shared-components/Navigation/Navigation";
import React from "react";
import {
  BasicDetailsIcon,
  BankDetailsIcon,
  AddressDetaisIcon,
  AppAccessIcon,
  UploadDocumentsIcon,
  EmploymentDetailsIcon,
} from "assets/svg/icon";

const commonPath = "/app/account-management/add-new-account";
const items = [
  {
    title: "Basic Details",
    icon: BasicDetailsIcon,
    path: commonPath + "/basic-details",
  },
  
  {
    title: "Address Details",
    icon: AddressDetaisIcon,
    path: commonPath + "/address-details",
  },
  
];

const NavigationAccountManagement = (props) => {
  return <Navigation items={items} onClick={props.onClick} />;
};

export default NavigationAccountManagement;
