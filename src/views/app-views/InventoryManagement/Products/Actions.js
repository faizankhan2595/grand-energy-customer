import React, { useState } from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { useHistory , useRouteMatch } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import Modal from "components/UI/Modal";

import { Menu, Typography, Button } from "antd";
import Icon from "@ant-design/icons";

import { ViewDetailsIcon , DeleteIcon , EditIcon } from "../ActionIcons";



const { Title, Text } = Typography;

const Actions = ({id}) => {

  const history = useHistory();
  const match = useRouteMatch();
  
  const ViewDetailsHandler = () => {
    // history.push(`${match.path}/products/product-details/${id}`)
  }

  return (
    <>
      
      <EllipsisDropdown
        menu={
          <Menu>
            <Menu.Item  onClick={ViewDetailsHandler()}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={ViewDetailsIcon}  />
                View Details
              </span>
            </Menu.Item>
            <Menu.Item >
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={EditIcon}  />
                Edit
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
