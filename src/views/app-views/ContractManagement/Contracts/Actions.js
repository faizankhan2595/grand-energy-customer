import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu, message } from "antd";
import { ViewDetailsIcon, CreateContractIcon, SendQuotationIcon } from "./ActionIcons";
import axios from "axios";
import moment from "moment";
import { InquiryStatusIcon } from "views/app-views/InquiryManagement/ActionsIcons";

const Actions = ({ contract_id, setOpenContractModal, record, getData, setQuoteData, updateStatus }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const viewContractHandler = () => {
    history.push(`${match.path}/view-contract-details/${contract_id}`);
    // /contracts/view-contract-details/
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
  }


  return (
    <EllipsisDropdown
      menu={
        <Menu>
          {/* <Menu.Item onClick={createContractHandler} disabled={record.status === 'Completed'}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={CreateContractIcon} /> Create Work Order
            </span>
          </Menu.Item> */}

          {/* <Menu.Item onClick={() => {
            updateStatus(record,"Completed");
          }} disabled={record.status === 'Completed'}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={InquiryStatusIcon} /> Mark as Complete
            </span>
          </Menu.Item> */}

          {/* <Menu.Item onClick={() => {
            updateStatus(record,"Active");
          }} disabled={record.status !== 'Completed'}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={SendQuotationIcon} /> Mark as Not Complete
            </span>
          </Menu.Item> */}

          <Menu.Item onClick={viewContractHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={ViewDetailsIcon} />
              View Contract Details
            </span>
          </Menu.Item>
        </Menu>
      }
    />
  );
};

export default Actions;
