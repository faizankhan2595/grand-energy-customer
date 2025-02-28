import Icon from "@ant-design/icons";
import React from "react";

import { submitTick } from "assets/svg/icon";

const QuotationModal = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>New Quotation Created</h1>
        <p>
          Quotation is created successfully.
        </p>
      </div>
    </div>
  );
};

export default QuotationModal;
