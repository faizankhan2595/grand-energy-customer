import Icon from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

import Button from "antd/es/button";

import { submitTick } from "assets/svg/icon";

import classes from "./Merge.module.css";

const Merge = (props) => {
  return (
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>Two account merged successfully !</h1>
        <p>
          account number: HC1234 is merged into Account Number: HC1235. Please
          find merged profiles in account details.
        </p>
        <div>
          <Link to="/app/account-management/account-details">
            <Button className={`m-1 mr-3 ${classes.btn}`} type="primary">
              Go to Accounts
            </Button>
          </Link>
          <Button className="m-1" onClick={props.onClose}>
            Cancel Merge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Merge;
