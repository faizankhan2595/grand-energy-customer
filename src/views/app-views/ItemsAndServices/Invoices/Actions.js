import React from "react";
import { useHistory , useRouteMatch} from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { EditIcon , VisibilityIcon , DeleteIcon , BoxIcon , PaymentsIcon } from "assets/svg/ActionsSvg";

const Actions = () => {
	const history = useHistory();
	const match = useRouteMatch();

	const sendInvoicesHandler = () => {
		history.push(`${match.path}/send-invoice`);
	}

  const createItemIdHandler = () => {
    history.push(`${match.path}/create-item-id`)
  }

  const viewItemsHandler = () => {
    history.push(`${match.path}/view-items`)
  }
  return (
    <EllipsisDropdown
      menu={
        <Menu>
          <Menu.Item onClick={viewItemsHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={VisibilityIcon} />
              View Details
            </span>
          </Menu.Item>
          <Menu.Item>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={DeleteIcon} />Delete</span>
          </Menu.Item>
          <Menu.Item onClick={sendInvoicesHandler}>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={EditIcon} />Send Invoice</span>
          </Menu.Item>
          <Menu.Item onClick={createItemIdHandler}>
            <span className="d-flex align-items-center" ><Icon className="mr-2" component={BoxIcon} />Create Item Id</span>
          </Menu.Item>
          <Menu.Item >
            <span className="d-flex align-items-center"><Icon className="mr-2" component={PaymentsIcon} />View Payments</span>
          </Menu.Item>
        </Menu>
      }
    />
  );
};

export default Actions;
