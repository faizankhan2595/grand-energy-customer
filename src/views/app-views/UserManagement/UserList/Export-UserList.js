import React from 'react'
import { Button, Typography } from 'antd';
import ExportDropdown from './Export-Dropdown';

import exportIcon from '../../../../assets/svg/file-export.svg'

const {Title} = Typography;

const Export = (props) => {
  const {onClose} = props;
  return (
    <div className='text-center p-3'>
      <div className='text-right'>
        <Button onClick={onClose}>close</Button>
      </div>
      <div className='mb-4'>
        <img src={exportIcon} alt="ExportIcon"></img>
        <Title>Export/Download Data</Title>
      </div>
      <div className='text-left mb-4'>
        <p>Select Department</p>
        <ExportDropdown/>
      </div>
      <div>
        <Button className='m-1 mr-3' type="primary">Yes, Confirm</Button>
        <Button className='m-1' onClick={onClose}>No, Cancel</Button>
      </div>
    </div>
  )
}

export default Export;