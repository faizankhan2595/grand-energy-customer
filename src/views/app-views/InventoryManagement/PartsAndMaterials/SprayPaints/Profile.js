import { Button, Card, Typography } from "antd";

import React from "react";

import SprayPaint from "assets/SprayPaintBig.png";

const { Title, Text } = Typography;

const data = [
  {
    title: "Parts & Material Category",
    text: "Paint",
  },
  {
    title: "Parts & Material Id",
    text: "#123456789",
  },
  {
    title: "Brand",
    text: "XYZ",
  },
  {
    title: "Qty",
    text: "18",
  },
];

const Profile = () => {
  return (
    <Card>
      <div className="d-flex flex-column align-items-center">
        <img src={SprayPaint} className="mb-3" />
        <Title strong>#Spray Paints</Title>
        <Button className="mb-4">Edit</Button>
        <div className="w-100">
          {data.map((item) => (
            <div className="d-block mb-4">
              <Text className="d-block mb-2">{item.title}</Text>

              <Text strong >{item.text}</Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Profile;
