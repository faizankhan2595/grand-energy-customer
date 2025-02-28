import React from "react";
import { Route , Redirect , useRouteMatch } from "react-router-dom";

import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

import SalesReport from "./SalesReport/SalesReport";
import FinancialReport from "./FinancialReport/FinancialReport";

const Reports = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/reports`} exact>
        <Redirect to={`${match.path}/sales-report`} />
      </Route>
      <Route path={`${match.path}/sales-report`} exact>
        <SalesReport/>
      </Route>
      <Route path={`${match.path}/financial-report`} exact>
        <FinancialReport/>
      </Route>
      
    </div>
  );
};

export default Reports;
