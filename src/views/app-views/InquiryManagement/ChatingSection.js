import React from "react";

import { Typography } from "antd";

import Actions from "./Actions";

import ProfilePic from "assets/PrimaryAccount.png";

const { Title, Text } = Typography;

const ChatingSection = () => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <div style={{ width: "4rem" }} className="mr-3">
          <img style={{ width: "100%" }} src={ProfilePic} />
        </div>
        <div>
          <Title strong level={4}>Johm Smith</Title>
          <Text>+65 123456789</Text>
        </div>
      </div>
      <Actions  />
    </div>
  );
};

export default ChatingSection;
