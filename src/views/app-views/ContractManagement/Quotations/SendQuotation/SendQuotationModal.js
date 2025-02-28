import Icon from "@ant-design/icons";
import React from "react";

import { submitTick } from "assets/svg/icon";

const SendQuotationModal = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>New Quotation Created Successfully.</h1>
        <p>
          Quotation Id HCI1234-QTN for items & services created successfully.
        </p>
      </div>
    </div>
  );
};

export default SendQuotationModal;
