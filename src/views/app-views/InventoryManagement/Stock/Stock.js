import React , {useState} from 'react'
import { Link , useHistory , useRouteMatch} from 'react-router-dom'

import { Button } from 'antd'
import Icon from "@ant-design/icons"

import SearchBox from 'components/shared-components/SearchBox'
import Filter from 'components/shared-components/Filter'
import Export from "./Export-Stock";
import Modal from "components/UI/Modal";
import PageHeading from 'components/shared-components/PageHeading/PageHeading'


import { InventoryManagementPageIcon , ExportIcon , FilterIcon , PlusIcon} from 'assets/svg/icon'
import StockTable from './StockTable'

const Stock = () => {

  const [showExportOption, setShowExportOption] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();

  
  const addNewHandler = () => {
    history.push(`${match.path}/add-new-parts-and-materials`);
  }

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  const exportModal = (
    <Modal onclose={exportHandler}>
      <Export onClose={exportHandler} />
    </Modal>
  );
  return (
    <React.Fragment>
      {showExportOption && exportModal}
      <PageHeading title="Inventory Management / Stocks" svg={InventoryManagementPageIcon}/>

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
        
      </div>
      <StockTable/>
      
    </React.Fragment>
  )
}

export default Stock