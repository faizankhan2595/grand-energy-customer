import React from "react";
import { useHistory , useRouteMatch} from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { ViewDetailsIcon , DeleteIcon , SendQuotationIcon , RecordPaymentsIcon } from "./ActionIcons";

const Actions = () => {
	const history = useHistory();
	const match = useRouteMatch();

	const sendQuotationHandler = () => {
		history.push(`${match.path}/send-quotation`);
	}

  const recordPaymentsHandler = () => {
    history.push(`${match.path}/record-payments`)
  }
  return (
    <EllipsisDropdown
      menu={
        <Menu>
          <Menu.Item>
            <span className="d-flex align-items-center">
              <Icon className="mr-2" component={ViewDetailsIcon} />
              View Details
            </span>
          </Menu.Item>
          <Menu.Item>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={DeleteIcon} />Delete</span>
          </Menu.Item>
          <Menu.Item onClick={sendQuotationHandler}>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={SendQuotationIcon} />Send Quotation</span>
          </Menu.Item>
          <Menu.Item onClick={recordPaymentsHandler}>
            <span className="d-flex align-items-center"><Icon className="mr-2" component={RecordPaymentsIcon} />Record Payments</span>
          </Menu.Item>
        </Menu>
      }
    />
  );
};

export default Actions;
