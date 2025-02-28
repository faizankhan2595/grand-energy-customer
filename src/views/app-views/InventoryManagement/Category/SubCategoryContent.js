import React , {useState} from 'react'
import { useHistory , useRouteMatch } from "react-router-dom";

import { Button} from "antd";
import Icon from '@ant-design/icons'

import { ExportIcon , PlusIcon , FilterIcon} from "assets/svg/icon";

import CategoryTable from "./CategoryTable";
import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import Export from "./ExportHandler-Category";
import Modal from "components/UI/Modal";
import SubCategoryTable from './SubCategoryTable';

const SubCategoryContent = () => {

  const [showExportModal, setShowExportModal] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();

  const exportHandler = () => {
    setShowExportModal((prev) => !prev);
  };

  const addNewSubCategoryHandler = () => {
    history.push(`${match.path}/add-new-sub-category`)
  } 
  return (
    <React.Fragment>
      {showExportModal && (
        <Modal onClose={exportHandler}>
          <Export onClose={exportHandler} />
        </Modal>
      )}
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
              onClick={addNewSubCategoryHandler}
            >
              <Icon component={PlusIcon} />
              Add new Sub-Category
            </Button>
          </div>
        </div>
        <SubCategoryTable/>
      </React.Fragment>
  )
}

export default SubCategoryContent