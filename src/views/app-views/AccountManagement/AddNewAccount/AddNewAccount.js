import { Link, Route, useRouteMatch , useHistory , useLocation} from 'react-router-dom';

import NavigationAccountManagement from 'components/NavigationAccountManagement/NavigationAccountManagement';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import React from 'react'
import { Redirect } from 'react-router-dom';

import UserManagementIcon from '../../../../assets/svg/usermManagementPage.svg'
import BasicDetailsAcc from './BasicDetailsAcc/BasicDetailsAcc';

import AddressDetailsAcc from './AddressDetails/AddressDetailsAcc';


const AddNewAccount = () => {

  const history = useHistory();
  const location = useLocation();

  const selectHandler = (event) => {
    const path = event.item.props.path;
    history.push({pathname: path})
  }

  const match = useRouteMatch();
  return (
    <React.Fragment>
      <PageHeading title="Account Management / Add New Account" icon={UserManagementIcon}/>
      <NavigationAccountManagement onClick={selectHandler}/>
      <Route path={`${match.path}`} exact>
        <Redirect to={`${match.path}/basic-details`} />
      </Route>
      <Route path={`${match.path}/basic-details`} exact>
        <BasicDetailsAcc/>
      </Route>
      
      <Route path={`${match.path}/address-details`} exact>
        <AddressDetailsAcc/>
      </Route>
      

    </React.Fragment>
  )
}

export default AddNewAccount;