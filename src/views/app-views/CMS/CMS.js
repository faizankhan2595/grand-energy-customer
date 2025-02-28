import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import TermAndConditions from './TermsAndConditions/TermsAndConditions';
import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './Privacy Policy/PrivacyPolicy';
import NotificationAndAlert from './NotificationAndAlert/NotificationAndAlert';
import AddNew from './NotificationAndAlert/AddNew';
import ContactDetails from './ContactDetails/ContactDetails';
import Gst from './GST/Gst';


function CMS() {

    const match = useRouteMatch();

    return (
        <div style={{backgroundColor:'#F5F7FB'}} >
            <Route path={`${APP_PREFIX_PATH}/cms`} exact>
                <Redirect to={`${match.path}/terms-&-conditions`} />
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/terms-&-conditions`} exact>
                <TermAndConditions/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/privacy-policy`} exact>
                <PrivacyPolicy/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/contact-details`} exact>
                <ContactDetails/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/notification-&-alert`} exact>
                <NotificationAndAlert/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/notification-&-alert/add-new`} exact>
                <AddNew/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/notification-&-alert/edit/:id`} exact>
                <AddNew/>
            </Route>
            <Route path={`${APP_PREFIX_PATH}/cms/gst`} exact>
                <Gst/>
            </Route>

        </div>
    )
}

export default CMS