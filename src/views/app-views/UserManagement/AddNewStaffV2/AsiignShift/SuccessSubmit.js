import Icon from '@ant-design/icons';
import React from 'react'

import Button from 'antd/es/button';

import { submitTick } from 'assets/svg/icon'

const SuccessSubmit = (props) => {
  return (
    <div className='text-center'>
      
      <Icon component={props.icon}/>
      <div className='mt-4'>
        <p style={{color:"#000B23"}} className='m-0 font-size-md font-weight-bold'>{props.title}</p>
        <p style={{color:'#72849A'}} className='m-0 mt-2 font-size-base font-weight-normal'>{props.desc}</p>
      </div>
    </div>
  )
}

export default SuccessSubmit