import React from "react";

import { Badge, List, Typography } from "antd";
import Icon from "@ant-design/icons";

import {
  AssignedIcon,
  ClosedIcon,
  EmailIcon,
  InboxIcon,
  UnassignedIcon,
  WhatsappIcon,
} from "./svgIcons";

const { Title } = Typography;

const data = [
  { icon: InboxIcon, text: "All", badgeNumber: 25 },
  { icon: AssignedIcon, text: "Assigned", badgeNumber: 5 },
  { icon: UnassignedIcon, text: "Unassigned", badgeNumber: 5 },
  { icon: WhatsappIcon, text: "Whatsapp", badgeNumber: 5 },
  { icon: EmailIcon, text: "Email", badgeNumber: 5 },
  { icon: ClosedIcon, text: "Closed", badgeNumber: 5 },
];

const AllInbox = () => {
  return (
    <>
      <List
        header={<Title level={3}>All Inbox</Title>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex justify-content-between w-100 align-items-center">
              <div className="d-flex align-items-center">
                <Icon component={item.icon} className="mr-3" />
                {item.text}
              </div>
              <Badge count={item.badgeNumber} style={{background: "#0099A8"}} />
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default AllInbox;
