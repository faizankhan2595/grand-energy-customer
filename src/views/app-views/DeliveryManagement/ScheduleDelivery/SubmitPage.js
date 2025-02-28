import Icon from "@ant-design/icons";
import React from "react";

import { submitTick } from "assets/svg/icon";

const SubmitPage = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>Delivery Scheduled Successfully !</h1>
        <p>
        Invoice Id HCI1234-INV is scheduled for delivery. 
        </p>
      </div>
    </div>
  );
};

export default SubmitPage;
