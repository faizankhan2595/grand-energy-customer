import React from "react";

import { Card, Typography, Steps } from "antd";
import Icon from "@ant-design/icons";

import { OvalIcon } from "views/app-views/ItemsAndServices/svgIcons";

const { Title } = Typography;

const items = [
  {
    title: "Inquiry Assigned",
    description: "05/09/2022,10:00 am",
  },
  { title: "Quotation Created", description: "05/09/2022,10:00 am" },
  { title: "Quotation Sent", description: "05/09/2022,10:00 am" },
  { title: "Quotation Approved", description: "05/09/2022,10:00 am" },
  { title: "Payment Done", description: "05/09/2022,10:00 am" },
  { title: "Invoice Creted", description: "05/09/2022,10:00 am" },
  { title: "Invoice Sent", description: "05/09/2022,10:00 am" },
  { title: "Pickup Sheduled", description: "05/09/2022,10:00 am" },
  { title: "Pickup Done", description: "05/09/2022,10:00 am" },
  { title: "Update Sent To Customer", description: "05/09/2022,10:00 am" },
  { title: "Ordering Of Parts", description: "05/09/2022,10:00 am" },
  { title: "Service Assigned", description: "05/09/2022,10:00 am" },
  { title: "Service Completed", description: "05/09/2022,10:00 am" },
  { title: "QC Checks Done", description: "05/09/2022,10:00 am" },
  { title: "Update To Customer", description: "05/09/2022,10:00 am" },
  { title: "Arranged Delivery", description: "05/09/2022,10:00 am" },
  { title: "Delivery Trip Sheduled", description: "05/09/2022,10:00 am" },
  { title: "Items Delivered", description: "05/09/2022,10:00 am" },
];

const ItemStatus = () => {
  return (
    <React.Fragment>
      <Card className="mt-3">
        <Title level={3} strong className="mb-4">
          Item Status
        </Title>

        <Steps progressDot current={7} direction="vertical" items={items} />
      </Card>
    </React.Fragment>
  );
};

export default ItemStatus;
