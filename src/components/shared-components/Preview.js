import React from 'react'

import { Card, Typography} from 'antd'

import classes from './Preview.module.css'


const {Title} = Typography;

const Preview = (props) => {
  return (
    <Card className="mt-3">
    <Title strong level={3}>{props.title}</Title>
    <div className={`d-flex justify-content-around p-5 ${classes.img}`}>
      {props.children}
    </div>
    </Card>
  )
}

export default Preview