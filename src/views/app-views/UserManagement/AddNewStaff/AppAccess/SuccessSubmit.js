import Icon from '@ant-design/icons';
import React from 'react'

import Button from 'antd/es/button';

import { submitTick } from 'assets/svg/icon'

const SuccessSubmit = (props) => {
  return (
    <div className='text-center'>
      
      <Icon component={submitTick}/>
      <div>
        <h1>New Staff Added Successfully!</h1>
        <p>User Id #123456789 John Smith, is added in staff successfully</p>
      </div>
    </div>
  )
}

export default SuccessSubmit