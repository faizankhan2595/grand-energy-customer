import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Finance from "./Dashboard/Finance";
import UserManagement from "./UserManagement/UserManagement";
import AccountManagement from "./AccountManagement/AccountManagement";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboard/finance`} component={lazy(() => import(`./Dashboard/Finance`))}/>
        <Route path={`${APP_PREFIX_PATH}/dashboard/inventory`} component={lazy(() => import(`./Dashboard/Inventory`))} />
        <Route path={`${APP_PREFIX_PATH}/customer-management`} component={lazy(() => import(`./CustomerManagement/CustomerManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/inquiry-management`} component={lazy(() => import(`./InquiryManagement/InquiryManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/task-management`} component={lazy(() => import(`./TaskManagement/Taskmanagement`))} />
        <Route path={`${APP_PREFIX_PATH}/cms`} component={lazy(() => import(`./CMS/CMS`))} />
        <Route path={`${APP_PREFIX_PATH}/inventory-management`} component={lazy(() => import(`./InventoryManagement/InventoryManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/contract-management`} component={lazy(() => import(`./ContractManagement/ContractManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/masters`} component={lazy(() => import(`./Masters/Masters`))} />
        <Route path={`${APP_PREFIX_PATH}/attendance-management`} component={lazy(() => import(`./AttendanceManagement/AttendanceManagement`))} />

        {/* <Route path={`${APP_PREFIX_PATH}/dashboard/sales`} component={lazy(() => import(`./Dashboard/Sales`))} /> */}
        {/* <Route path={`${APP_PREFIX_PATH}/user-management`} component={lazy(() => import(`./UserManagement/UserManagement`))} /> */}
        {/* <Route path={`${APP_PREFIX_PATH}/chats`} component={lazy(() => import(`./Chats/Chats`))} /> */}
        {/* <Route path={`${APP_PREFIX_PATH}/account-management`} component={lazy(() => import(`./AccountManagement/AccountManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/items-and-services`} component={lazy(() => import(`./ItemsAndServices/ItemsAndServices`))} />
        <Route path={`${APP_PREFIX_PATH}/delivery-management`} component={lazy(() => import(`./DeliveryManagement/DeliveryManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/finance-management`} component={lazy(() => import(`./FinanceManagement/FinanceManagement`))} />
        <Route path={`${APP_PREFIX_PATH}/reports`} component={lazy(() => import(`./Reports/Reports`))} /> */}
        
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/attendance-management`} />
        
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);