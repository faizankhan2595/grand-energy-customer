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
import Export from "./Export-SalesReport";
import SalesReportTable from "./SalesReportTable";

const { Text } = Typography;

const SalesReport = () => {
  const [showExportOption, setShowExportOption] = useState(false);

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  return (
    <React.Fragment>
      {showExportOption && (
        <Modal onClose={exportHandler}>
          <Export onClose={exportHandler} />
        </Modal>
      )}
      <PageHeading svg={ReportsPageIcon} title="Reports / Sales Report" />

      <Space size="middle" className="mb-3">
        <SearchBox />
        <Button
          className="d-flex align-items-center ml-2"
          onClick={exportHandler}
        >
          <Icon className="mr-2" component={ExportIcon} />
          Export
        </Button>

        <Select placeholder="Items" style={{ minWidth: "290px" }} />

        <DatePicker placeholder="DD/MM/YYYY" style={{ width: "290px" }} />
      </Space>

      <Card>
        <SalesReportTable />

        <Row className="mt-5">
          <Col span={12}>
            <Text strong className="ml-5">Total</Text>
          </Col>
          <Col span={4}>
            <Text strong style={{marginLeft: "1.8rem"}}>200</Text>
          </Col>
          <Col span={3}>
            <Text strong className="ml-3">80</Text>
          </Col>
          <Col span={4}>
            <Text strong style={{marginLeft: "2.5rem"}}>S$400.00</Text>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default SalesReport;
