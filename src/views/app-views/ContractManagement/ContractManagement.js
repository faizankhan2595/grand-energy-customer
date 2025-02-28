import React from "react";
import { Route , Redirect , useRouteMatch } from "react-router-dom";

import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


import Quotations from "./Quotations/Quotations";
import AddNewQuotation from "./Quotations/AddNewQuotation";
import SendQuotation from "./Quotations/SendQuotation/SendQuotation";
import RecordPayments from "./Quotations/RecordPayments/RecordPayments";
import Contracts from "./Contracts/Contracts";
import ViewContract from "./Contracts/ViewContract/ViewContract";
import ViewQuotation from "./Quotations/ViewQuotation/ViewQuotation";
import GenerateInvoice from "./Quotations/Invoice/GenerateInvoice";
import ViewInvoice from "./Quotations/Invoice/ViewInvoice/ViewInvoice";
import ContractDetails from "./Contracts/ContractDetails/ContractDetails";
import WorkOrder from "./WorkdOrder/WorkOrder";
import ContractView from "./Contracts/ContractView";
import ServiceInvoice from "./ServiceTimeSheet/ServiceInvoice";
// import Invoices from "./Invoices/Invoices";
// import SendQuotation from "./Quotations/SendQuotation/SendQuotation";
// import SendInvoice from "./Invoices/SendInvoice/SendInvoice";
// import CreateItemId from "./Invoices/CreateItemId/CreateItemId";
// import ViewItems from "./Invoices/ViewItems/ViewItems";
// import ItemDetails from "./Invoices/ViewItems/ItemDetails/ItemDetails";
// import PhysicalAssessment from "./Invoices/ViewItems/PhysicalAssessment/PhysicalAssessment";

const ContractManagement = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/contract-management`} exact>
        <Redirect to={`${match.path}/quotations`} />
      </Route>
      <Route path={`${match.path}/quotations`} exact>
        <Quotations/>
      </Route>
      <Route path={`${match.path}/quotations/add-new-quotation`} exact>
        <AddNewQuotation/>
      </Route>
      <Route path={`${match.path}/quotations/add-new-quotation/:inquiry_id`} exact>
        <AddNewQuotation/>
      </Route>
      <Route path={`${match.path}/quotations/view-quotation/:id`} exact>
        <ViewQuotation/>
      </Route>

      {/* <Route path={`${match.path}/quotations/record-payments`} exact> */}
      <Route path={`${match.path}/quotations/record-new-payment/:quotation_id`} exact>
        <RecordPayments/>
      </Route>

      <Route path={`${match.path}/quotations/generate-invoice/:quotation_id`} exact>
        <GenerateInvoice/>
      </Route>
      <Route path={`${match.path}/quotations/view-invoice/:id`} exact>
        <ViewInvoice/>
      </Route>
      <Route path={`${match.path}/quotations/edit-invoice/:id`} exact>
        <GenerateInvoice/>
      </Route>
      {/* <Route path={`${match.path}/invoices`} exact>
        <Invoices/>
      </Route>
      <Route path={`${match.path}/invoices/send-invoice`} exact>
        <SendInvoice/>
      </Route>
      <Route path={`${match.path}/invoices/create-item-id`} exact>
        <CreateItemId/>
      </Route> */}

      <Route path={`${match.path}/contracts`} exact>
        <Contracts />
      </Route>
      <Route path={`${match.path}/work-orders/view-work-order/:id`} exact>
        <ViewContract/>
      </Route>
      <Route path={`${match.path}/work-orders/view-service/:id`} exact>
        <ServiceInvoice/>
      </Route>
      <Route path={`${match.path}/contracts/view-contract-details/:id`} exact>
        <ContractView/>
      </Route>
      {/* <Route path={`${match.path}/contracts/view-contract-details/:id`} exact>
        <ContractDetails/>
      </Route> */}
      <Route path={`${match.path}/contracts/send-invoice`} exact>
        <SendQuotation/>
      </Route>
      <Route path={`${match.path}/work-orders`} exact>
        <WorkOrder/>
      </Route>
    </div>
  );
};

export default ContractManagement;