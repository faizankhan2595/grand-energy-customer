import React, { useState } from "react";
import { useHistory , useRouteMatch } from "react-router-dom";

import { Col, Row, Button, Tabs } from "antd";
import Icon from "@ant-design/icons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import Modal from "components/UI/Modal";
import Export from "../Export-InventoryManagement";

import { InventoryManagementPageIcon } from "assets/svg/icon";
import { ExportIcon } from "assets/svg/icon";
import {
  TransactionsIcon,
  PriceChartIcon,
  QuotaionsIcon,
  PurchaseOrderIcon,
  ActiveTransactionsIcon,
  ActivePriceChartIcon,
  ActivePurchaseOrdersIcon,
  ActiveQuotationsIcon,
} from "../../TabIcons";

import Transactions from "./Transactions";
import PurchaseOrders from "./PurchaseOrders";
import PriceChart from "./PriceChart";
import Quotations from "./Quotations";

const tabs = [
  {
    text: "Transactions",
    svg: TransactionsIcon,
    activeSvg: ActiveTransactionsIcon,
    content: <Transactions/>
  },
  {
    text: "Price Chart",
    svg: PriceChartIcon,
    activeSvg: ActivePriceChartIcon,
    content: <PriceChart/>
  },
  {
    text: "Purchase Orders",
    svg: PurchaseOrderIcon,
    activeSvg: ActivePurchaseOrdersIcon,
    content: <PurchaseOrders/>
  },
  {
    text: "Quotations",
    svg: QuotaionsIcon,
    activeSvg: ActiveQuotationsIcon,
    content: <Quotations/>
  },
];

const SprayPaints = () => {
  const [showExportOption, setShowExportOption] = useState(false);
  const [currActiveKey , setCurrActiveKey] = useState("1");

  const history = useHistory();
  const match = useRouteMatch();

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);
  }

  const addPoHandler = () => {
    history.push(`${match.path}/add-new-po`)
  }

  const addQuoteHandler = () => {
    history.push(`${match.path}/add-new-quotation`)
  }

  const exportModal = (
    <Modal onclose={exportHandler}>
      <Export onClose={exportHandler} />
    </Modal>
  );
  return (
    <React.Fragment>
      {showExportOption && exportModal}
      <Row>
        <Col span={10}>
          <PageHeading
            title="Inventory Management / Part & Material / spray paints"
            svg={InventoryManagementPageIcon}
          />
        </Col>
        <Col span={14}>
          <div className=" d-flex align-items-center justify-content-end ">
            <SearchBox />
            <Button
              className="d-flex align-items-center ml-3"
              onClick={exportHandler}
            >
              <Icon className="mr-2" component={ExportIcon} />
              Export
            </Button>
            {currActiveKey === "3" && <Button type="primary"  className="ml-3" onClick={addPoHandler}>Add New PO</Button>}
            {currActiveKey === "4" && <Button type="primary"  className="ml-3" onClick={addQuoteHandler}>Add New Quote</Button>}
          </div>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="1"
        className="Part_Material_View_Details_Tabs"
        onChange={tabChangeHandler}
        items={tabs.map((item, index) => {
          const id = String(index + 1);
          
          return {
            label: (
              <div className="d-flex align-items-center">
                <Icon component={ currActiveKey === id ? item.activeSvg : item.svg} />
                {item.text}
              </div>
            ),
            key: id,
            children: item.content,
          };
        })}
        
      />


    </React.Fragment>
  );
};

export default SprayPaints;
