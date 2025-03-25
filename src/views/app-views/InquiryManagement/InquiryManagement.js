import React from "react";
import { Route , Redirect , useRouteMatch } from "react-router-dom";

import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


import InquiryList from "./InquiryList";
import InquiryChats from "./InquiryChats";
import AddNewInquiry from "./AddNewInquiry";
import ViewInquiry from "./ViewInquiry";

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
      <Route path={`${match.path}/add-new-inquiry`} exact>
        <AddNewInquiry/>
      </Route>
      <Route path={`${match.path}/edit-inquiry/:id`} exact>
        <AddNewInquiry/>
      </Route>
      <Route path={`${match.path}/chats`} exact>
        <InquiryChats/>
      </Route>
      <Route path={`${match.path}/view-inquiry/:id`} exact>
        <ViewInquiry/>
      </Route>
    </div>
  );
};

export default InquiryManagement;
