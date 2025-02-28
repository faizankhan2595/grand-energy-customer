import Icon from "@ant-design/icons";
import React from "react";

import { submitTick } from "assets/svg/icon";

const PreviewModal = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>Item Assessment Recorded Suceesfully!</h1>
      </div>
    </div>
  );
};

export default PreviewModal;
