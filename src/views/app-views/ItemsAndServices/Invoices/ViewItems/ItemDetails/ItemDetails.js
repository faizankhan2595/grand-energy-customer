import React from "react";

import { Row, Col, Typography } from "antd";
import Icon from "@ant-design/icons"

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import ItemDetailsForm from "./ItemDetailsForm";
import CustomerDetailsForm from "./CustomerDetailsForm";
import PhysicalAssessment from "./PhysicalAssessment_ItemDetails";
import Preview from "components/shared-components/Preview";

import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import BagImg from 'assets/Bag.png'
import {NoImageIcon} from '../../../svgIcons'
import ItemStatus from "./ItemStatus";

const {Title ,  Text} = Typography;

const ItemDetails = () => {
  return (
    <React.Fragment>
      <PageHeading
        title="Items & Services / Invoices / Items / Item Details"
        svg={ItemsAndServicesPageIcon}
      />

      <Row gutter={20}>
        <Col span={16}>
          <ItemDetailsForm />
          <CustomerDetailsForm />
          <PhysicalAssessment />
        </Col>
        <Col span={8}>
          <Preview title="Item Before Service">
            <img src={BagImg} alt="Bag Image"/>
            <img src={BagImg} alt="Bag Image"/>
          </Preview>
          <Preview>
            <div className="text-center">
            <Icon component={NoImageIcon}/>
            <Title level={3} strong>No Image Found.</Title>
            <Text>You will see after services images once craftsman upload it.</Text>
            </div>
          </Preview>
          <ItemStatus/>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ItemDetails;
