import React from "react";
import { useHistory , useRouteMatch} from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu, message } from "antd";
import { ViewDetailsIcon , CreateContractIcon, SendQuotationIcon } from "./ActionIcons";
import axios from "axios";
import moment from "moment";

const Actions = ({contract_id,setOpenContractModal,record,getData,setQuoteData,setJobsData}) => {
	const history = useHistory();
	const match = useRouteMatch();

	const viewContractHandler = () => {
    history.push(`/app/contract-management/work-orders/view-work-order/${contract_id}`);
	}
  
	const viewContractDetailsHandler = () => {
    history.push(`${match.path}/view-contract-details/${contract_id}`);
	}
  
	const editContractHandler = () => {
    // history.push(`${match.path}/edit-contract/${contract_id}`);
    history.push(`${match.path}/view-contract-details/${contract_id}`);
	}
  const createContractHandler = () => {
    setOpenContractModal(true)
    setQuoteData(record)
    setJobsData(record.line_items ? JSON.parse(record.line_items) : [])
	}


  return (
    <EllipsisDropdown
      menu={
        <Menu>
           {/* <Menu.Item onClick={createContractHandler} disabled={record.status==='Completed'}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={CreateContractIcon} /> Create Work Order
              </span>
            </Menu.Item> */}
            {/* <Menu.Item  onClick={updateStatus} disabled={record.status==='Completed'}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={SendQuotationIcon} /> Mark as Complete 
              </span>
            </Menu.Item> */}
          {/* <Menu.Item onClick={editContractHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={CreateContractIcon} />Edit Contract</span>
          </Menu.Item> */}

          {/* <Menu.Item onClick={viewContractDetailsHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={CreateContractIcon} />View Contract Details</span>
          </Menu.Item> */}
            <Menu.Item onClick={createContractHandler} disabled={record.status === 'Completed'}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={CreateContractIcon} /> Create Service Entry Sheet
            </span>
          </Menu.Item>
          <Menu.Item onClick={viewContractHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={ViewDetailsIcon} />
              View Service Order
            </span>
          </Menu.Item>
        </Menu>
      }
    />
  );
};

export default Actions;
