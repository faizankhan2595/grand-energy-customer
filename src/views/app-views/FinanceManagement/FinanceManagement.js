import React from 'react'
import { Redirect, Route , useRouteMatch } from 'react-router-dom'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


import Invoices from './Invoices/Invoices';
import Payments from './Payments/Payments';
// import AddNewAccount from './AddNewAccount/AddNewAccount';


const FinanceManagement = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/finance-management`} exact>
        <Redirect to={`${match.path}/invoices`}/>
      </Route>
      <Route path={`${match.path}/invoices`} exact>
        <Invoices/>
      </Route>
      <Route path={`${match.path}/payments`} exact>
        <Payments/>
      </Route>
      
    </div>
  )
}

export default FinanceManagement