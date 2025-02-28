import React, { useState } from "react";
import { Button , Card } from "antd";
import Icon from "@ant-design/icons";

import UserManagementIcon from "../../../../assets/svg/usermManagementPage.svg";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "../../../../components/shared-components/SearchBox";
import filterIcon from "../../../../assets/svg/filterIcon.svg";
import exportIcon from "../../../../assets/svg/exportIcon.svg";
import plusIcon from "../../../../assets/svg/plus.svg";
import AccountListTable from "./AccountListTable";
// import Actions from "./Actions";
import Filter from "../../../../components/shared-components/Filter";
import Modal from "components/UI/Modal";
import Export from "./Export-AccountList";
import { Link, useRouteMatch } from "react-router-dom";
import Drawer from "react-modern-drawer";

import { MergeIcon } from "assets/svg/icon";
import "react-modern-drawer/dist/index.css";
import MergeDrawer from "./MergeDrawer";
import Merge from "./Merge";

import classes from './AccountList.module.css';
// import { getStatusClassNames } from "antd/lib/_util/statusUtils";

const AccountList = () => {
  const match = useRouteMatch();

  const [showExportOption, setShowExportOption] = useState(false);

  const [showMergeModal , setShowMergeModal] = useState(false);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  const drawerHandler = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  const mergeHandler = () => {
    setShowMergeModal(prev => !prev);
  }

  const exportModal = (
    <Modal onclose={exportHandler}>
      <Export onClose={exportHandler} />
    </Modal>
  );

  const mergeModal = (
    <Modal onclose={mergeHandler}>
      <Merge onClose={mergeHandler}/>
    </Modal>
  )
  // if(drawerIsOpen) {

  // }
  return (
    <React.Fragment>

      
      <Drawer
        open={drawerIsOpen}
        onClose={drawerHandler}
        direction="right"
        zIndex={1000}
        size={950}
        className={`${classes.drawer}`}
      > 
        
        <MergeDrawer onClose={drawerHandler} toggleModal={mergeHandler}/>
        
        
      </Drawer>
      
      
      

      {showExportOption && exportModal}
      {showMergeModal && mergeModal}
      {/* Heading */}
      <div>
        <PageHeading
          icon={UserManagementIcon}
          title="Account Management / Account List"
        />
      </div>

      {/* buttons */}
      <div className="d-flex justify-content-between mb-3">
        <div className=" d-flex align-items-center justify-content-between">
          <SearchBox />
          <Filter>
            <Button className="d-flex align-items-center ml-2">
              <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
              Filters
            </Button>
          </Filter>

          <Button
            className="d-flex align-items-center ml-2"
            onClick={exportHandler}
          >
            <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
          </Button>
          <Button
            onClick={drawerHandler}
            className="d-flex align-items-center ml-2"
          >
            <Icon component={MergeIcon}></Icon>Merge
          </Button>
        </div>
        <div>
          <Link to="/app/account-management/add-new-account">
            <Button
              className="d-flex align-items-center"
              type="primary"
              size="large"
            >
              <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
              Add new
            </Button>
          </Link>
        </div>
      </div>

      {/* table */}
      <div>
        <AccountListTable />
      </div>
    </React.Fragment>
  );
};

export default AccountList;
