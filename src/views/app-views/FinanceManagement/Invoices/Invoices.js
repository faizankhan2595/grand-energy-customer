import React, { useCallback, useState } from "react";

import { Button } from "antd";
import Icon from "@ant-design/icons";

import {
  FinanceManagementPageIcon,
  FilterIcon,
  ExportIcon,
} from "assets/svg/icon";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";
import Export from "./Export-Invoices";
import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import InvoicesTable from "./InvoicesTable";
import SendDueAlertModal from "./SendDueAlertModal";

const Invoices = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSendAlertModal, setShowSendAlertModal] = useState(false);

  const exportHandler = () => {
    setShowModal((prev) => !prev);
  };

  const sendAlertHandler = useCallback(() => {
    setShowSendAlertModal((prev) => !prev);
  } , []);

  return (
    <React.Fragment>
      {showModal && (
        <Modal onClose={exportHandler}>
          <Export onClose={exportHandler} />
        </Modal>
      )}

      {showSendAlertModal && (
        <Modal onClose={sendAlertHandler}>
          <SendDueAlertModal onClose={sendAlertHandler}/>
        </Modal>
      )}
      <PageHeading
        title="Finance Management / Invoice List"
        svg={FinanceManagementPageIcon}
      />

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
      </div>

      <InvoicesTable onSendAlert={sendAlertHandler}/>
    </React.Fragment>
  );
};

export default Invoices;
