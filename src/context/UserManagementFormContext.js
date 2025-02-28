import { createContext, useState } from "react";

export const UserManagementFormContext = createContext({
  // FormData: {
  //   staffId: null,
  //   fullName: null,
  //   emailId: null,
  //   phoneNumber: null,
  //   nationality: null, // ageGroup
  //   dateOfBith: null,
  //   gender: null,
  //   martialStatus: null,
  //   race: null,
  //   religion: null,
  //   role: null ,
  //   department: null ,
  //   joiningDate: null ,
  //   confirmationDate: null ,
  //   residencyStatus: null ,
  //   nationality: null,
  //   icNumber: null,
  //   workPermitNumber: null,
  //   typeOfWorkPermit: null,
  //   expiryDateWorkPermit: null,
  //   PassportNumber: null,
  //   expiryDatePassport: null,
  //   nricfin : null,
  //   workingStatus : null,
  //   noticePeriod : null,
  // },
  formData: {},
  editFormData: {},
  setData: () => {},
  setEditData: () => {}
});

export const UserManagementFormContextProvider = (props) => {
  const [formData, setFormData] = useState({});
  const [editFormData , setEditFormData] = useState({});

  const setData = (data) => {
    // console.log(formData);
    setFormData((prev) => {return {...prev , ...data}});
  };

  const  setEditData = (data) => {
    setEditFormData((prev) => {return {...prev , ...data}});
  }

  return (
    <UserManagementFormContext.Provider
      value={{
        formData,
        editFormData,
        setData,
        setEditData,
      }}
    >
      {props.children}
    </UserManagementFormContext.Provider>
  );
};
