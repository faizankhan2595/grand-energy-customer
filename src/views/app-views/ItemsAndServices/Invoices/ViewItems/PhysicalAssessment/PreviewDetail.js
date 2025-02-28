import React from "react";

import { Typography } from "antd";
import Icon from "@ant-design/icons"

import { DoubleTickIcon } from "views/app-views/ItemsAndServices/svgIcons";

const { Text } = Typography;

const PreviewDetail = (props) => {
  const { value, field } = props;

  console.log(value);
  return (
    <React.Fragment>
      <Text strong>{field}</Text>
      <br />
      <br />
      
      {value.map((item) => (
        <div className="d-flex align-items-center">
        {props.icon && <Icon component={DoubleTickIcon} className="mr-3"/>}
        <Text>{item}</Text>
        <br/>
        </div>
      ))}
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default PreviewDetail;
