import React from "react";
import { useHistory , useRouteMatch} from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { EditIcon , VisibilityIcon } from "assets/svg/ActionsSvg";

const Actions = () => {
	const history = useHistory();
	const match = useRouteMatch();

	const sendInvoicesHandler = () => {
		// history.push(`${match.path}/send-invoice`);
	}

  const physicalAssessmentHandler = () => {
    history.push(`${match.path}/physical-assessment`)
  }

  const viewItemDetailsHandler = () => {
    history.push(`${match.path}/item-details`)
  }
  return (
    <EllipsisDropdown
      menu={
        <Menu>
          <Menu.Item onClick={viewItemDetailsHandler}>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={VisibilityIcon} />
              View Details
            </span>
          </Menu.Item>
          
          <Menu.Item onClick={physicalAssessmentHandler}>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={EditIcon} />Physical Assessment</span>
          </Menu.Item>
          
        </Menu>
      }
    />
  );
};

export default Actions;
