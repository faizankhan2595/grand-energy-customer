import React, { useState , useEffect } from "react";
import { Button , Modal } from "antd";
import axios from "axios";

import UserManagementIcon from "../../../../assets/svg/usermManagementPage.svg";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "./SearchBox";
import filterIcon from "../../../../assets/svg/filterIcon.svg";
import exportIcon from "../../../../assets/svg/exportIcon.svg";
import plusIcon from "../../../../assets/svg/plus.svg";
import UserListTable from "./UserListTable";
// import Actions from "./Actions";
import Filter from "./Filter";
import MyModal from "components/UI/Modal";
import Export from "./Export-UserList";
import { Link , useRouteMatch  } from "react-router-dom";


const UserList = () => {

  const match = useRouteMatch();

  const [showExportOption , setShowExportOption] = useState(false);
  const [searchText , setSearchText] = useState("");

  

  const exportHandler = () => {
    setShowExportOption(prev => !prev);
  }

  
  const [error , setError] = useState(null);

  

  const exportModal = (
    <MyModal onclose={exportHandler}>
      
      <Export onClose={exportHandler}/>
    </MyModal>
  )

  useEffect(() => {
    window.location.href= "https://tc-hrms.reddotapps.com.sg/all-users?type=current"
  }, [])
  
  return (
    <React.Fragment>

      {showExportOption && exportModal}
      {/* Heading */}
      <div>
        <PageHeading
          icon={UserManagementIcon}
          title="User Management / User List"
        />
      </div>

      {/* buttons */}
      <div className="d-flex justify-content-between mb-3">
        <div className=" d-flex align-items-center justify-content-between">
          <SearchBox onSearch={(text) => setSearchText(text)} onChange={(e) => setSearchText(e.target.value)}/>
          <Filter>
            <Button className="d-flex align-items-center ml-2">
              <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
              Filters
            </Button>
          </Filter>

          <Button className="d-flex align-items-center ml-2" onClick={exportHandler}>
            <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
          </Button>
        </div>
        <div>
          <Link to="/app/user-management/add-new-staff">
          <Button
            className="d-flex align-items-center"
            type="danger"
            size="large"
          >
            <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
            Add New Staff
          </Button>
          </Link>
        </div>
      </div>

      {/* table */}
      <div>
      
        <UserListTable setError={setError} searchText={searchText}/>
      </div>
    </React.Fragment>
  );
};

export default UserList;
