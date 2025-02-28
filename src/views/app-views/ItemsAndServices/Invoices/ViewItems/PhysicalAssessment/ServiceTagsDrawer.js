import React from "react";

import { Card, Typography, Button, Col, Row, Space, List, Input } from "antd";
import Icon from "@ant-design/icons";

import { CrossIcon } from "assets/svg/icon";
import Bag1 from "assets/Bag1.png";
import Bag2 from "assets/Bag2.png";
import Bag3 from "assets/Bag3.png";
import Bag4 from "assets/Bag4.png";

import classes from "./ServiceTagsDrawer.module.css";
import { getNodeText } from "@testing-library/react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const data = [
  {
    image: Bag1,
    text: "Service Tag 1",
  },
  {
    image: Bag2,
    text: "Service Tag 2",
  },
  {
    image: Bag3,
    text: "Service Tag 3",
  },
  {
    image: Bag4,
    text: "Service Tag 4",
  },
];

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const ServiceTagsDrawer = (props) => {
  const { onClose , next} = props;

  const saveHandler = () => {
    onClose();
    next();
  }

  return (
    <>
      <Card style={{ borderRadius: "8px 8px 0 0" }}>
        <div className="d-flex justify-content-between pl-4 pr-4 w-100">
          <div>
            <Title level={3} style={{ color: "#0099A8" }}>
              Service Tags
            </Title>
            <Text strong>Add tags for services.</Text>
          </div>
          <button className={`${classes.cross}`} onClick={onClose}>
            <Icon component={CrossIcon}></Icon>
          </button>
        </div>
      </Card>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Row gutter={80}>
                <Col span={10}>
                  <img style={{width: "190px" , height: "138px"}} src={item.image}/>
                </Col>
                <Col span={14}>
                  <Title strong level={4}>{item.text}</Title>
                  <TextArea rows={4} placeholder="Type Here" maxLength={16}/>
                </Col>
              </Row>

            
          </List.Item>
        )}
      />

      <div className="ml-5 mr-5 mt-5">
        <div className={`d-flex justify-content-end ${classes.actions} mb-4`}>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button className={`${classes.merge_btn}`} type="primary" onClick={saveHandler}>
              Save
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default ServiceTagsDrawer;
