import React from "react";

import { Card, Typography, Button, Col, Row, Space } from "antd";
import Icon from "@ant-design/icons";

import { CrossIcon } from "assets/svg/icon";
import PrimaryAccount from "./PrimaryAccount";
import SecondryAccount from "./SecondryAccount";

import { MergeDrawerIcon } from "assets/svg/icon";

import classes from './MergeDrawer.module.css'

const { Title, Text } = Typography;

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const MergeDrawer = (props) => {
  const { onClose , toggleModal } = props;

  const mergeHandler = () => {
    onClose();
    toggleModal();
  }
  return (
    <>
      <Card style={{ borderRadius: "8px 8px 0 0" }}>
        <div className="d-flex justify-content-between pl-4 pr-4 w-100">
          <div>
            <Title level={3} style={{ color: "#0099A8" }}>
              Merge
            </Title>
            <Text strong>Merge two same account below.</Text>
          </div>
          <button className={`${classes.cross}`} onClick={onClose}>
            <Icon component={CrossIcon}></Icon>
          </button>
        </div>
      </Card>

      <div className="ml-5 mr-5">
        <Row>
          <Col span={11}>
            <PrimaryAccount />
          </Col>

          <Col
            span={2}
            className="d-flex justify-content-center align-items-center"
          >
            <Icon component={MergeDrawerIcon} />
          </Col>

          <Col span={11}>
            <SecondryAccount />
          </Col>
        </Row>
        <div className={`d-flex justify-content-end ${classes.actions} mb-4`}>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button className={`${classes.merge_btn}`} type="primary" onClick={mergeHandler}>Merge</Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default MergeDrawer;
