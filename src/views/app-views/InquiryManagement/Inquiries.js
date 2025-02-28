import React from "react";

import { Typography, Button, List, Badge } from "antd";
import Icon from "@ant-design/icons";

import { FilterIcon, SearchIcon, WhatsappIcon } from "assets/svg/icon";
import ProfilePic from "assets/PrimaryAccount.png";

const { Title, Text } = Typography;

const data = ["item1", "item2", "item3"];

const Inquiries = () => {
  const header = (
    <div className="d-flex justify-content-between">
      <Title level={3}>Inquiries</Title>
      <div className="d-flex">
        <Button>
          <Icon component={SearchIcon} />
        </Button>
        <Button>
          <Icon component={FilterIcon} />
        </Button>
      </div>
    </div>
  );
  return (
    <List
      header={header}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex">
              <div style={{width: "4rem"}} className="mr-4">
              <img style={{maxWidth: "100%"}} src={ProfilePic}></img>
              </div>
              
              <div>
                <Title strong level={4}>Johm Smith</Title>
                <Text  type="secondary">Okay , thank you so much</Text>
                <br />
                <br />
                
                
                <Text strong  >#123 General Inquiry</Text>
              </div>
            </div>
            <div>
              <Title strong secondry level={5}>15 min ago</Title>
              <div className="d-flex align-items-center justify-content-around">
                <Badge count={1} style={{ background: "#0099A8" }} />
                <Icon component={WhatsappIcon} />
              </div>
              <br />
              
              <Title strong level={4} style={{ color: "#00AB6F" }}>Assigned</Title>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Inquiries;
