import React , {useState} from "react";
import { Link } from "react-router-dom";

import { Button } from "antd";
import Icon from "@ant-design/icons"

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import InvoicesTable from "./InvoicesTable";
import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import Export from "./Export";
import Modal from "components/UI/Modal";

import { ItemsAndServicesPageIcon , PlusIcon , ExportIcon , FilterIcon } from "assets/svg/icon";

const Invoices = () => {

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
      <PageHeading
        title="Items & Services / Invoices"
        svg={ItemsAndServicesPageIcon}
      />

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
          {/* <Link to="/app/items-and-services/quotations/add-new-quotation"> */}
          <Button
            className="d-flex align-items-center"
            type="primary"
            size="large"
          >
            <Icon component={PlusIcon}/>
            Add new
          </Button>
          {/* </Link> */}
        </div>
      </div>

      {/* table */}
      <div>
        <InvoicesTable />
      </div>
    </React.Fragment>
  );
};

export default Invoices;
