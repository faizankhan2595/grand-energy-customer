import React from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import {Modal} from "antd";
import Icon , {ExclamationCircleOutlined} from "@ant-design/icons"
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "../../../../components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { UserManagementFormContext } from "context/UserManagementFormContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const Actions = (props) => {
	const {onDelete , id , onEdit , editUser} = props;
 
  const ctx = useContext(UserManagementFormContext);
  const history = useHistory();

  

  const editHandler = () => {
    ctx.setEditData(editUser);
    history.push(`/app/user-management/add-new-staff`);
  }
  const deleteHandler = () => {
    Modal.confirm({
      title: 'Are you sure delete the user?',
      icon: <ExclamationCircleOutlined />,
      content: `User Id - ${id}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  return (
    <EllipsisDropdown
      menu={
        <Menu>
          <Menu.Item>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={VisibilityIcon} />
              View Details
            </span>
          </Menu.Item>
          <Menu.Item onClick={editHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={EditIcon} />
              Edit Details
            </span>
          </Menu.Item>
          <Menu.Item onClick={deleteHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={DeleteIcon} />
              Delete
            </span>
          </Menu.Item>
        </Menu>
      }
    />
  );
};

export default Actions;
