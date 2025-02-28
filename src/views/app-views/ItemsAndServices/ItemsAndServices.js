import React from "react";
import { Route , Redirect , useRouteMatch } from "react-router-dom";

import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


import Quotations from "./Quotations/Quotations";
import AddNewQuotation from "./Quotations/AddNewQuotation";
import SendQuotation from "./Quotations/SendQuotation/SendQuotation";
import RecordPayments from "./Quotations/RecordPayments/RecordPayments";
import Invoices from "./Invoices/Invoices";
import SendInvoice from "./Invoices/SendInvoice/SendInvoice";
import CreateItemId from "./Invoices/CreateItemId/CreateItemId";
import ViewItems from "./Invoices/ViewItems/ViewItems";
import ItemDetails from "./Invoices/ViewItems/ItemDetails/ItemDetails";
import PhysicalAssessment from "./Invoices/ViewItems/PhysicalAssessment/PhysicalAssessment";

const ItemsAndServices = () => {

  const match = useRouteMatch();
  return (
    <div>
      {/* <Route path={`${APP_PREFIX_PATH}/items-and-services`} exact> */}
      <Route path={`${APP_PREFIX_PATH}/contract-management`} exact>
        <Redirect to={`${match.path}/quotations`} />
      </Route>
      <Route path={`${match.path}/quotations`} exact>
        <Quotations/>
      </Route>
      <Route path={`${match.path}/quotations/add-new-quotation`} exact>
        <AddNewQuotation/>
      </Route>
      <Route path={`${match.path}/quotations/send-quotation`} exact>
        <SendQuotation/>
      </Route>
      <Route path={`${match.path}/quotations/view-quotation`} exact>
        <SendQuotation/>
      </Route>
      <Route path={`${match.path}/quotations/record-payments`} exact>
        <RecordPayments/>
      </Route>
      <Route path={`${match.path}/invoices`} exact>
        <Invoices/>
      </Route>
      <Route path={`${match.path}/invoices/send-invoice`} exact>
        <SendInvoice/>
      </Route>
      <Route path={`${match.path}/invoices/create-item-id`} exact>
        <CreateItemId/>
      </Route>
      <Route path={`${match.path}/invoices/view-items`} exact>
        <ViewItems/>
      </Route>
      <Route path={`${match.path}/invoices/view-items/item-details`} exact>
        <ItemDetails/>

      </Route>
      <Route path={`${match.path}/invoices/view-items/physical-assessment`} exact>
        <PhysicalAssessment/>
      </Route>
    </div>
  );
};

export default ItemsAndServices;
