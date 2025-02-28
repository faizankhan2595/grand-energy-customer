import React , {useState} from 'react'
import { useHistory , useRouteMatch } from "react-router-dom";

import { Button} from "antd";
import Icon from '@ant-design/icons'

import { ExportIcon , PlusIcon , FilterIcon, InventoryManagementPageIcon} from "assets/svg/icon";


import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import Export from "./Export-Vendors";
import Modal from "components/UI/Modal";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import VendorsTable from './VendorsTable';

const Vendors = () => {

  const [showExportModal, setShowExportModal] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();

  const exportHandler = () => {
    setShowExportModal((prev) => !prev);
  };

  const addNewHandler = () => {
    history.push(`${match.path}/add-new-vendor`)
  } 
  return (
    <React.Fragment>
      {showExportModal && (
        <Modal onClose={exportHandler}>
          <Export onClose={exportHandler} />
        </Modal>
      )}

      <PageHeading
      title="Inventory Management / Vendors" 
      svg = {InventoryManagementPageIcon}/>


        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between">
            <SearchBox />
            <Filter>
              <Button className="d-flex align-items-center ml-2">
                <Icon className="mr-2" component={FilterIcon} />
                Filters
              </Button>
            </Filter>

            <Button
              className="d-flex align-items-center ml-2"
              onClick={exportHandler}
            >
              <Icon className="mr-2" component={ExportIcon} />
              Export
            </Button>
          </div>
          <div>
            <Button
              className="d-flex align-items-center"
              type="primary"
              size="large"
              onClick={addNewHandler}
            >
              <Icon component={PlusIcon} />
              Add New 
            </Button>
          </div>
        </div>
        <VendorsTable/>
      </React.Fragment>
  )
}

export default Vendors