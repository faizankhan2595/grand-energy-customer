import React, { useState } from "react";
import { Button } from "antd";
import Icon from "@ant-design/icons"

// import UserManagementIcon from "../../../../assets/svg/usermManagementPage.svg";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import { FilterIcon, ItemsAndServicesIcon } from "assets/svg/icon";

import { ExportIcon } from "assets/svg/icon";

import { PlusIcon } from "assets/svg/icon";
import UserListTable from "./QuotationTable";
// import Actions from "./Actions";
import Filter from "components/shared-components/Filter";
import Modal from "components/UI/Modal";
import Export from "./Export-ItemsAndServices";
import QuotationTable from "./QuotationTable";
import { Link , useRouteMatch  } from "react-router-dom";
import { Item } from "rc-menu";

const Quotations = () => {

  const match = useRouteMatch();

  const [showExportOption , setShowExportOption] = useState(false);

  const exportHandler = () => {
    setShowExportOption(prev => !prev);
  }

  

  const exportModal = (
    <Modal onclose={exportHandler}>
      
      <Export onClose={exportHandler}/>
    </Modal>
  )
  return (
    <React.Fragment>

      {showExportOption && exportModal}
      {/* Heading */}
      <div>
        <PageHeading
          
          svg={ItemsAndServicesPageIcon}
          title="Items & Services / Quotations"
        />
      </div>

      {/* buttons */}
      <div className="d-flex justify-content-between mb-3">
        <div className=" d-flex align-items-center justify-content-between">
          <SearchBox />
          <Filter>
            <Button className="d-flex align-items-center ml-2">
              <Icon className="mr-2" component={FilterIcon} />
              Filters
            </Button>
          </Filter>

          <Button className="d-flex align-items-center ml-2" onClick={exportHandler}>
            <Icon className="mr-2" component={ExportIcon}/>Export
          </Button>
        </div>
        <div>
          <Link to="/app/items-and-services/quotations/add-new-quotation">
          <Button
            className="d-flex align-items-center"
            type="primary"
            size="large"
          >
            <Icon component={PlusIcon}/>
            Add new
          </Button>
          </Link>
        </div>
      </div>

      {/* table */}
      <div>
        <QuotationTable />
      </div>
    </React.Fragment>
  );
};

export default Quotations;
