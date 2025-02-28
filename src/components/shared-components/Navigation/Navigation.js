import { useState } from 'react';

import { ImageSvg , payment} from 'assets/svg/icon';


import  { Menu } from 'antd';
import Icon , { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const Navigation = (props) => {

  const {items , onClick } = props;

  // const onClick = (e) => {
  //   console.log('click ', e);
  //   setCurrent(e.key);
  // };
  

  return (
  // <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
  //   <Menu.Item key="mail" icon={<MailOutlined />}>
  //     Navigation One
  //   </Menu.Item>
  //   <Menu.Item key="mail" icon={<MailOutlined />}>
  //     Navigation two
  //   </Menu.Item>
    
  // </Menu>
  <Menu mode="horizontal" defaultSelectedKeys={['mail']} onClick={onClick}>
  {items.map(item => (
    <Menu.Item key={item.index} icon={<Icon component={item.icon}/>} path={item.path} >
      {item.title}
    
    </Menu.Item>
  ))}
  </Menu>
  );
};
export default Navigation;