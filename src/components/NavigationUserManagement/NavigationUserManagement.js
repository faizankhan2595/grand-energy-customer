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

const commonPath = "/app/user-management/add-new-staff";
const items = [
  {
    title: "Basic Details",
    icon: BasicDetailsIcon,
    path: commonPath + "/basic-details",
  },
  {
    title: "Employment/Education Details",
    icon: EmploymentDetailsIcon,
    path: commonPath + "/employment-details",
  },
  {
    title: "Address Details",
    icon: AddressDetaisIcon,
    path: commonPath + "/address-details",
  },
  {
    title: "Bank Details",
    icon: BankDetailsIcon,
    path: commonPath + "/bank-details",
  },
  {
    title: "Upload Documents",
    icon: UploadDocumentsIcon,
    path: commonPath + "/upload-documents",
  },
  {
    title: "App Access",
    icon: AppAccessIcon,
    path: commonPath + "/app-access",
  },
];

const NavigationUserManagement = (props) => {
  return <Navigation items={items} onClick={props.onClick} />;
};

export default NavigationUserManagement;
