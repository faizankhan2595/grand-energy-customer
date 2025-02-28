import CustomDropdown from 'components/shared-components/CustomDropdown/CustomDropdown'
import React from 'react'
import { Menu } from 'antd';

const menu = (
  
  <Menu>
    <Menu.Item>1st menu</Menu.Item>
    <Menu.Item>2nd menu</Menu.Item>
    <Menu.Item>3rd menu</Menu.Item>
  </Menu>
);

const ExportDropdown = () => {
  return (
    <CustomDropdown text="Select" menu={menu}/>
  )
}

export default ExportDropdown;