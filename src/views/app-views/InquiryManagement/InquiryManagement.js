import React from "react";
import { Route , Redirect , useRouteMatch } from "react-router-dom";

import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


import InquiryList from "./InquiryList";
import InquiryChats from "./InquiryChats";

const InquiryManagement = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/inquiry-management`} exact>
        <Redirect to={`${match.path}/inquiry-list`} />
      </Route>
      <Route path={`${match.path}/inquiry-list`} exact>
        <InquiryList/>
      </Route>
      <Route path={`${match.path}/chats`} exact>
        <InquiryChats/>
      </Route>
    </div>
  );
};

export default InquiryManagement;
