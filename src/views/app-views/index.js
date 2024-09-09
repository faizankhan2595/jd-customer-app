import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route exact path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <Route exact path={`${APP_PREFIX_PATH}/staff-management/admin-accounts`} component={lazy(() => import(`./staff-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/staff-management/admin-accounts/add-new`} component={lazy(() => import(`./staff-management/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/customer-accounts`} component={lazy(() => import(`./customer-management/customer-accounts`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/customer-accounts/details/:id`} component={lazy(() => import(`./customer-management/customer-accounts/details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/customer-accounts/details/:id/inquiry-details/:Inqid`} component={lazy(() => import(`./customer-management/customer-accounts/details/inquiry-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/customer-accounts/details/:id/order-details/:Ordid`} component={lazy(() => import(`./customer-management/customer-accounts/details/order-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/free-user-accounts`} component={lazy(() => import(`./customer-management/free-user-accounts`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/workshop-users`} component={lazy(() => import(`./customer-management/workshop-users`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/workshop-users/add-new`} component={lazy(() => import(`./customer-management/workshop-users/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/customer-management/workshop-users/edit/:id`} component={lazy(() => import(`./customer-management/workshop-users/add-new/edit`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors`} component={lazy(() => import(`./machine-and-sensor`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/life-cycle-management/add-new-life-cycle-event`} component={lazy(() => import(`./machine-and-sensor/machine-details/add-new-life-cycle-event`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/view-reports/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-reports/Index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/misc-files/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/view-past-event/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-past-event`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/misc-files/:id/add-new`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/add-new`} component={lazy(() => import(`./machine-and-sensor/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/edit/:id`} component={lazy(() => import(`./machine-and-sensor/add-new/edit`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/add-new/:id`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/edit-sensor/:id/:editId`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/edit.js`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/:id`} component={lazy(() => import(`./machine-and-sensor/view-sensor`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management`} component={lazy(() => import(`./order-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/order-details/:id`} component={lazy(() => import(`./order-management/order-detail`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/order-details/schedule-order/:id`} component={lazy(() => import(`./order-management/schedule-order`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/order-details/schedule-order/view-quotation/:id`} component={lazy(() => import(`./order-management/view-quotation`))} />
        <Route exact path={`${APP_PREFIX_PATH}/notifications`} component={lazy(() => import(`./notification`))} />
        <Route exact path={`${APP_PREFIX_PATH}/notifications/add_notification`} component={lazy(() => import(`./notification/add_notification`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);