import React from "react";

import { Card, Typography } from "antd";
import Icon from "@ant-design/icons";

import { DeliveryInspectionIcon } from "views/app-views/ItemsAndServices/svgIcons";

import classes from './PhysicalAssessment.module.css';

const { Title, Text } = Typography;

const PhysicalDetails_ItemDetails = () => {
  return (
    <React.Fragment>
      <Card className="mt-3">
        <Title strong level={4}>
          Physical Assesment
        </Title>
        <div className={`text-center ${classes.body}`}>
          <Icon component={DeliveryInspectionIcon} />
          <Title strong level={3}>
            Item Physical Assesment Not Done Yet.
          </Title>
          <Text>You will see Physical assessment details once item pickup</Text>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PhysicalDetails_ItemDetails;
