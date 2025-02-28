import React, { useState } from "react";

import {
  Button,
  Select,
  DatePicker,
  Space,
  Card,
  Col,
  Typography,
  Row,
} from "antd";
import Icon from "@ant-design/icons";

import { ReportsPageIcon, ExportIcon } from "assets/svg/icon";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import Modal from "components/UI/Modal";
import Export from "./Export-FinancialReport";
import RevenueTable from "./RevenueTable/RevenueTable";
import ProfitLossTable from "./ProfitLossTable/ProfitLossTable";

const { Text } = Typography;

const FinancialReport = () => {
  const [showExportOption, setShowExportOption] = useState(false);
  const [showRevenue , setShowRevenue] = useState(true);

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  const changeHandler = (value) => {

    if(value === "revenue"){
      setShowRevenue(true);
    }
    else{
      setShowRevenue(false);
    }
  }

  return (
    <React.Fragment>
      {showExportOption && (
        <Modal onClose={exportHandler}>
          <Export onClose={exportHandler} />
        </Modal>
      )}
      <PageHeading svg={ReportsPageIcon} title="Reports / Financial Report" />

      <Space size="middle" className="mb-3">
        <SearchBox />
        <Button
          className="d-flex align-items-center ml-2"
          onClick={exportHandler}
        >
          <Icon className="mr-2" component={ExportIcon} />
          Export
        </Button>

        <Select
          defaultValue="revenue"
          style={{ minWidth: "290px" }}
          onChange={changeHandler}
          options={[
            {
              label: "Revenue",
              value: "revenue"
            },
            {
              label: "Profit & Loss",
              value: "profitAndLoss"
            },
          ]}
        />

        <DatePicker placeholder="DD/MM/YYYY" style={{ width: "290px" }} />
      </Space>
      
      
      {showRevenue && <RevenueTable/>}
      {!showRevenue && <ProfitLossTable/>}
      
        
    </React.Fragment>
  );
};

export default FinancialReport;
