import React from 'react'
import { Redirect, Route , useRouteMatch } from 'react-router-dom'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

import DeliveryInvoice from './DeliveryInvoice/DeliveryInvoice';
import ScheduleDelivery from './ScheduleDelivery/ScheduleDelivery';
// import AddNewAccount from './AddNewAccount/AddNewAccount';


const DeliveryManagement = () => {

  const match = useRouteMatch();
  return (
    <div>
      <Route path={`${APP_PREFIX_PATH}/delivery-management`} exact>
        <Redirect to={`${match.path}/delivery-invoice`}/>
      </Route>
      <Route path={`${match.path}/delivery-invoice`} exact>
        <DeliveryInvoice/>
      </Route>
      <Route path={`${match.path}/delivery-invoice/schedule-delivery`} exact>
        <ScheduleDelivery/>
      </Route>
      
    </div>
  )
}

export default DeliveryManagement