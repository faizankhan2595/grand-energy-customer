import Icon from "@ant-design/icons";
import React from "react";

import Modal from "components/UI/Modal";
import { submitTick } from "assets/svg/icon";

const CreateItemIdModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
    <div className="text-center">
      <Icon component={submitTick} />
      <div>
        <h1>Item IDs Created Successfully !</h1>
        <p>
        HCI1234-ORD-1-1: XYZ Hand Bag
        </p>
        <p>
        HCI1234-ORD-1-2: Sneakers
        </p>
      </div>
    </div>
    </Modal>
  );
};

export default CreateItemIdModal;
