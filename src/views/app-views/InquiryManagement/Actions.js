import React, { useState } from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import Modal from "components/UI/Modal";

import { Menu, Typography, Button } from "antd";
import Icon from "@ant-design/icons";

import {
  CrossIcon,
  ChangeAssigneeIcon,
  ReportEnquiryIcon,
  CreateQuotationIcon,
  InquiryStatusIcon
} from "./ActionsIcons";

import { InquiryIcon } from "./svgIcons";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

const { Title, Text } = Typography;

const Actions = ({setInquiryData,openStatusModal,inquiry_id}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const InquiryStatusHandler = () => {
    openStatusModal((prev) => !prev);
  };

  const CreateQuotationHandler = () => {
    history.push(`/app/contract-management/quotations/add-new-quotation/${inquiry_id}`);
  };

  return (
    <>
      <EllipsisDropdown
        menu={
          <Menu>
            <Menu.Item onClick={CreateQuotationHandler}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={CreateQuotationIcon}  />
                Create Quotation
              </span>
            </Menu.Item>
            <Menu.Item  onClick={InquiryStatusHandler}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={InquiryStatusIcon}  />
                Inquiry Status
              </span>
            </Menu.Item>
          </Menu>
        }
      />
    </>
  );
};

export default Actions;
