import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import CustomerAccounts from './CustomerAccounts/CustomerAccounts'
import JobSites from './JobSites/JobSites'
// import AddNewCustomer from './AddNewCustomer'
import AddNewUser from './AddNewUser'
import CustomerDetails from './CustomerAccounts/CustomerDetails'
import AddNewPayments from './CustomerAccounts/AddNewPayments'
import AddNewInvoice from './CustomerAccounts/AddNewInvoice'
import EditInvoice from './CustomerAccounts/EditInvoice'
import Invoice from './CustomerAccounts/Invoice'
import { useLocation } from 'react-router-dom'
import CustomerUsersAll from './CustomerUsersAll/CustomerUsersAll'
import ViewCustomer from './ViewCustomer'
import AddUpdateCustomer from './AddUpdateCustomer'


function CustomerManagement() {

    const match = useRouteMatch();
    return (
        <div>
            <Route path={`${APP_PREFIX_PATH}/customer-management`} exact>
                <Redirect to={`${match.path}/customer-accounts`} />
            </Route>
            {/* <Route path={`${match.path}/customer-accounts/:user_id`} exact>
                <DailyAttendanceProfile />
            </Route> */}
            <Route path={`${match.path}/customer-accounts`} exact>
                <CustomerAccounts />
            </Route>
            <Route path={`${match.path}/customer-accounts/customer-details/:id`} exact>
                <CustomerDetails/>
            </Route>
            <Route path={`${match.path}/customer-accounts/customer-details/:id/invoice`} exact>
                <Invoice/>
            </Route>
            <Route path={`${match.path}/customer-accounts/add-new-payments`} exact>
                <AddNewPayments/>
            </Route>
            <Route path={`${match.path}/customer-accounts/add-new-invoice/:id`} exact>
                <AddNewInvoice/>
            </Route>
            <Route path={`${match.path}/customer-accounts/edit-invoice/:id`} exact>
                <EditInvoice/>
            </Route>
            {/* <Route path={`${match.path}/customer-accounts/add-new`} exact>
                <AddNewCustomer   />
            </Route> */}
            <Route path={`${match.path}/customer-accounts/add-new`} exact>
                <AddUpdateCustomer   />
            </Route>
            <Route path={`${match.path}/customer-accounts/edit/:id`} exact>
                <AddUpdateCustomer />
            </Route>
            <Route path={`${match.path}/customer-accounts/view/:id`} exact>
                <ViewCustomer />
            </Route>
            {/* <Route path={`${match.path}/customer-accounts/add-new-customer-user/:customer_id`} exact> */}
            <Route path={`${match.path}/customer-accounts/add-new-associate-customer/:customer_id`} exact>
                <AddNewUser />
            </Route>
            {/* <Route path={`${match.path}/customer-accounts/edit-customer-user/:id`} exact> */}
            <Route path={`${match.path}/customer-accounts/edit-associate-customer/:id`} exact>
                <AddNewUser />
            </Route>
            <Route path={`${match.path}/job-sites`} exact>
                <JobSites  />
            </Route>
            <Route path={`${match.path}/customer-users-all`} exact>
                <CustomerUsersAll  />
            </Route>
            {/* <Route path={`${match.path}/job-sites/add-shift`} exact>
                <AddNewShift />
            </Route> */}
        </div>
    )
}

export default CustomerManagement