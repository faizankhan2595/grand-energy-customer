import { Button, Card, Typography, List } from "antd";
import Icon from "@ant-design/icons";

import React from "react";

import profilePic from "assets/Ellipse-21.png";
import {
  AccoutnNumerIcon,
  BirthdayIcon,
  MobileIcon,
  ExploreIcon,
  MailIcon,
} from "assets/svg/icon";

const { Title, Text } = Typography;

const dataAccountDetails = [
  { icon: AccoutnNumerIcon, text: "HC1234" },
  { icon: BirthdayIcon, text: "19/08/1990" },
];

const dataContactDetails = [
  { icon: MobileIcon, text: "+65 123456788" },
  { icon: ExploreIcon, text: "15 Changi Business Park Cres Singapore" },
  { icon: MailIcon, text: "johnsmith@gmail.com" },
];

const Profile = () => {
  return (
    <Card>
      <div className="d-flex flex-column align-items-center">
        <img src={profilePic} />
        <Title>John Smith</Title>
        <Button>Edit Profile</Button>
      </div>

      <List
        header={<Title level={3}>Account Details</Title>}
        dataSource={dataAccountDetails}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex justify-content-around">
              <Icon component={item.icon} className="mr-3" />
              {item.text}
            </div>
          </List.Item>
        )}
      />

      <List
        header={<Title level={3}>Contact</Title>}
        dataSource={dataContactDetails}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex justify-content-around">
              <Icon component={item.icon} className="mr-3" />
              {item.text}
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Profile;
