import Icon from "@ant-design/icons";
import React from "react";

import { submitTick } from "assets/svg/icon";

const SaveRecordPaymentsModal = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>Payment Recorded Successfully!</h1>
        <p>
          Payment of S$ 100.00 for Quotation Id HCI1234-QTN recorded
          successfully!
        </p>
      </div>
    </div>
  );
};

export default SaveRecordPaymentsModal;
