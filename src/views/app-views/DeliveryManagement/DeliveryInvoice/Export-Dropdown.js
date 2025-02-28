import CustomDropdown from 'components/shared-components/CustomDropdown/CustomDropdown'
import React from 'react'
import { Menu } from 'antd';

const menu = (
  <Menu
    items={[
      {
        label: <p>1st menu</p>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

const ExportDropdown = () => {
  return (
    <CustomDropdown text="Select" menu={menu}/>
  )
}

export default ExportDropdown;