import React, { useState } from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { useHistory , useRouteMatch } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import Modal from "components/UI/Modal";

import { Menu, Typography, Button } from "antd";
import Icon from "@ant-design/icons";

import { ViewDetailsIcon , DeleteIcon , CreatePoIcon } from "../ActionIcons";



const { Title, Text } = Typography;

const Actions = () => {

  const history = useHistory();
  const match = useRouteMatch();
  
  const ViewDetailsHandler = () => {
    
  }

  // const closeInquiryModal = (
  //   <Modal>
  //     <div className="text-center">
  //       <Icon component={InquiryIcon} />
  //       <div>
  //         <Title>Close Inquiry</Title>
	// 				<br/>
  //         <Text type="secondary">
  //           Are you sure you want to close enquiry id 123456?
  //         </Text>
  //         <div>
  //           <br />
  //           <br />
           

  //           <Button className="m-1 mr-3 " type="primary">
  //             Yes, Confirm
  //           </Button>

  //           <Button className="m-1" onClick={closeInquiryHandler}>
  //             No, Cancel
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </Modal>
  // );

  return (
    <>
      
      <EllipsisDropdown
        menu={
          <Menu>
            <Menu.Item  onClick={ViewDetailsHandler}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={ViewDetailsIcon}  />
                View Details
              </span>
            </Menu.Item>
            <Menu.Item >
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={DeleteIcon}  />
                Delete
              </span>
            </Menu.Item >
            
           
          </Menu>
        }
      />
    </>
  );
};

export default Actions;
