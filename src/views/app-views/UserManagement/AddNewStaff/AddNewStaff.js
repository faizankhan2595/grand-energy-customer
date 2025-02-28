import { Link, Route, useRouteMatch , useHistory , useLocation} from 'react-router-dom';

import NavigationUserManagement from 'components/NavigationUserManagement/NavigationUserManagement';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import React from 'react'
import { Redirect } from 'react-router-dom';

import UserManagementIcon from '../../../../assets/svg/usermManagementPage.svg'
import BasicDetails from './BasicDetails/BasicDetails';
import EmploymentDetails from './EmpolymentDetails/EmploymentDetails';
import AddressDetails from './AddressDetails/AddressDetails';
import BankDetails from './BankDetails/BankDetails';
import AppAccess from './AppAccess/AppAccess';
import UploadDocuments from './UploadDocuments/UploadDocuments';

const AddNewStaff = () => {

  const history = useHistory();
  const location = useLocation();

  const selectHandler = (event) => {
    const path = event.item.props.path;
    history.push({pathname: path})
  }

  const match = useRouteMatch();
  return (
    <React.Fragment>
      <PageHeading title="User Management / Add New Staff" icon={UserManagementIcon}/>
      <NavigationUserManagement onClick={selectHandler}/>
      <Route path={`${match.path}`} exact>
        <Redirect to={`${match.path}/basic-details`} />
      </Route>
      <Route path={`${match.path}/basic-details`} exact>
        <BasicDetails/>
      </Route>
      <Route path={`${match.path}/employment-details`} exact>
        <EmploymentDetails/>
      </Route>
      <Route path={`${match.path}/address-details`} exact>
        <AddressDetails/>
      </Route>
      <Route path={`${match.path}/bank-details`} exact>
        <BankDetails/>
      </Route>
      <Route path={`${match.path}/upload-documents`} exact>
        <UploadDocuments/>
      </Route>
      <Route path={`${match.path}/app-access`} exact>
        <AppAccess/>
      </Route>

    </React.Fragment>
  )
}

export default AddNewStaff;