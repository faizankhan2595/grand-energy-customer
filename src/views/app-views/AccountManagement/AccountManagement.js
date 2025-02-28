import React from 'react'
import { Redirect, Route , useRouteMatch } from 'react-router-dom'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import AccountList from './AccountList/AccountList';
// import AddNewAccount from './AddNewAccount/AddNewAccount';
import AccountDetails from './AccountDetails/AccountDetails';
// import AddNewAccount from './AddNewAccount/AddNewAccount';
import AddNewAccount from './AddNewAccountV2';


const AccountManagement = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/account-management`} exact>
        <Redirect to={`${match.path}/account-list`}/>
      </Route>
      <Route path={`${match.path}/account-list`} exact>
        <AccountList/>
      </Route>
      <Route path={`${match.path}/add-new-account`} exact>
        <AddNewAccount/>
      </Route>
      <Route path={`${match.path}/account-details`} exact>
        <AccountDetails/>
      </Route>
    </div>
  )
}

export default AccountManagement