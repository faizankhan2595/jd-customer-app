import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route exact path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts`} component={lazy(() => import(`./user-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts/account-details/:id`} component={lazy(() => import(`./user-management/view-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/free-user`} component={lazy(() => import(`./free-user/FreeUser`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management`} component={lazy(() => import(`./order-management/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/add-order`} component={lazy(() => import(`./order-management/AddOrder/AddOrder`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/order-detail`} component={lazy(() => import(`./order-management/order-detail/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/view-quotation`} component={lazy(() => import(`./order-management/view-quotation/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/schedule-order`} component={lazy(() => import(`./order-management/schedule-order/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management`} component={lazy(() => import(`./inquiry-management/InquiryManagement`))} />
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management/new-inquiry`} component={lazy(() => import(`./inquiry-management/AddInquiry/AddInquiry`))} />
       
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management/inquiry-details`} component={lazy(() => import(`./inquiry-management/InquiryDetails/InquiryDetails`))} />
        <Route exact path={`${APP_PREFIX_PATH}/technician-management`} component={lazy(() => import(`./technician-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/technician-management/addNew`} component={lazy(() => import(`./technician-management/AddNew/AddNew`))} />
    
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors`} component={lazy(() => import(`./machine-and-sensor`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/add-new`} component={lazy(() => import(`./machine-and-sensor/add-new/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details`} component={lazy(() => import(`./machine-and-sensor/machine-details/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/view-past-event`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-past-event/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/misc`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/misc/add-new`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/add-new/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensors`} component={lazy(() => import(`./machine-and-sensor/view-sensor/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensors/add-new`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/reports`} component={lazy(() => import(`./Reports/Index`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${localStorage.getItem("dashboardType") != "workshop" ? `${APP_PREFIX_PATH}/dashboard` : `${APP_PREFIX_PATH}/machine-and-sensors`}`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);