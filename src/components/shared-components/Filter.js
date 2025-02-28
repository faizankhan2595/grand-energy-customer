import { Button, Dropdown, Menu, Space } from "antd";
import React from "react";
// const menu = (
//   <Menu
//     items={[
//       {
//         key: "1",
//         label: (
//           <a
//             target="_blank"
//             rel="noopener noreferrer"
//             href="https://www.antgroup.com"
//           >
//             1st menu item
//           </a>
//         ),
//       },
//       {
//         key: "2",
//         label: (
//           <a
//             target="_blank"
//             rel="noopener noreferrer"
//             href="https://www.aliyun.com"
//           >
//             2nd menu item
//           </a>
//         ),
//       },
//       {
//         key: "3",
//         label: (
//           <a
//             target="_blank"
//             rel="noopener noreferrer"
//             href="https://www.luohanacademy.com"
//           >
//             3rd menu item
//           </a>
//         ),
//       },
//     ]}
//   />
// );

const menu = (
  <Menu>
    <Menu.Item>item 1</Menu.Item>
    <Menu.Item>item 2</Menu.Item>
  </Menu>
);

const Filter = (props) => {
  // return (
  //   <Dropdown overlay={menu} placement="bottomLeft">
  //     {props.children}
  //   </Dropdown>
  // );

  return (
    <Dropdown overlay={menu}>
      <a>Hover me</a>
    </Dropdown>
  );
};
export default Filter;
