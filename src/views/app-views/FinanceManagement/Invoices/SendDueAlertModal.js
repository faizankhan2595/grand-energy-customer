import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Space } from "antd";
import Icon from "@ant-design/icons";

import { AlertMailIcon } from "assets/svg/icon";

import { APP_PREFIX_PATH } from "configs/AppConfig";

const SendDueAlertModal = (props) => {

  const history = useHistory();

  const sendInvoiceHandler = () => {
    history.push(`${APP_PREFIX_PATH}/items-and-services/invoices/send-invoice`)
  }
  return (
    <div className="text-center ml-5 mr-5">
      <Icon component={AlertMailIcon} />
      <div>
        <h1>Send Due Alert</h1>
        <p>
        Are you sure you want to sent due alert for invoice HCI1234-INV
        </p>
      </div>
      <Space size="middle">
        <Button type="primary" onClick={sendInvoiceHandler}>Yes, Send</Button>
        <Button onClick={props.onClose}>No, Cancel</Button>
      </Space>
    </div>
  );
};

export default SendDueAlertModal;
