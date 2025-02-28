import React, { useState } from "react";
import { useHistory , useRouteMatch } from "react-router-dom";

import { Col, Row, Button, Tabs } from "antd";
import Icon from "@ant-design/icons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import VendorQuotes from "./VendorQuotes"

import { InventoryManagementPageIcon , FilterIcon } from "assets/svg/icon";
import {
  
  QuotaionsIcon,
  PurchaseOrderIcon,
  ActivePurchaseOrdersIcon,
  ActiveQuotationsIcon,
} from "../../TabIcons";
import PurchaseOrders from "./PuchaseOrders";



const tabs = [
  {
    text: "Vendor Quotes",
    svg: QuotaionsIcon,
    activeSvg: ActiveQuotationsIcon,
    content: <VendorQuotes/>,
  },
  {
    text: "Purchase Orders",
    svg: PurchaseOrderIcon,
    activeSvg: ActivePurchaseOrdersIcon,
    content: <PurchaseOrders/>
  },
  
];

const VendorDetails = () => {
 
  const [currActiveKey , setCurrActiveKey] = useState("1");

  const history = useHistory();
  const match = useRouteMatch();

  

  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);
  }

  const addPoHandler = () => {
    history.push(`${match.path}/add-new-po`)
  }

  const addQuoteHandler = () => {
    history.push(`${match.path}/add-new-quotation`)
  }

  
  return (
    <React.Fragment>
      
      <Row>
        <Col span={10}>
          <PageHeading
            title="Inventory Management / Vendors / Vendors Details"
            svg={InventoryManagementPageIcon}
          />
        </Col>
        <Col span={14}>
          <div className=" d-flex align-items-center justify-content-end ">
            <SearchBox />
            <Filter>
              <Button className="d-flex align-items-center ml-2">
                <Icon className="mr-2" component={FilterIcon} />
                Filters
              </Button>
            </Filter>
          
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

export default VendorDetails;
