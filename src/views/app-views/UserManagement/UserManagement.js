import React from 'react'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import UserList from './UserList/UserList';
import AddNewStaff from './AddNewStaffV2/AddNewStaff';
import { UserManagementFormContextProvider } from 'context/UserManagementFormContext';
// import { useUserManagementForm } from 'hooks/UserManagementForm-hook';


const UserManagement = () => {



  const match = useRouteMatch();
  return (
    <div>
      <UserManagementFormContextProvider>
        <Route path={`${APP_PREFIX_PATH}/user-management`} component={() => {
          window.location.href = 'https://tc-hrms.reddotapps.com.sg/all-users?type=current';
          return null;
        }} />
        {/* <Route path={`${APP_PREFIX_PATH}/user-management`} exact>
        <Redirect to={`${match.path}/user-list`}/>
      </Route> */}
        {/* <Route path={`${match.path}/user-list`}>
          <UserList />
        </Route>
        <Route path={`${match.path}/add-new-staff`}>
          <AddNewStaff />
        </Route> */}
      </UserManagementFormContextProvider>
    </div>
  )
}

export default UserManagement