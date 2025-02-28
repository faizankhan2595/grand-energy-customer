import React from 'react'
import { Typography } from "antd";
import Icon from '@ant-design/icons'


const {Title} = Typography;

const PageHeading = (props) => {
  return (
    <div className="d-flex mb-4">
        <span className="mr-1">
          {props.svg && <Icon component={props.svg}/>}
          {!props.svg && props.icon && <img src={props.icon} alt={props.title}></img>}
          
        </span>
        <Title level={3} className="font-weight-bold">
        {props.title}
        </Title>
      </div>
  )
}

export default PageHeading;