import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const AppViews = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {

    } else {
      history.push('/auth/login')
    }

  });
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route exact path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts`} component={lazy(() => import(`./user-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts/add-new`} component={lazy(() => import(`./user-management/add-new`))} /> 
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts/edit/:id`} component={lazy(() => import(`./user-management/add-new`))} /> 
        <Route exact path={`${APP_PREFIX_PATH}/user-management/user-accounts/account-details/:id`} component={lazy(() => import(`./user-management/view-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/user-management/free-user`} component={lazy(() => import(`./free-user/FreeUser`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management`} component={lazy(() => import(`./order-management/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/add-order`} component={lazy(() => import(`./order-management/AddOrder/AddOrder`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/order-detail/:id`} component={lazy(() => import(`./order-management/order-detail/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/view-quotation/:id`} component={lazy(() => import(`./order-management/view-quotation/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/order-management/orders`} component={lazy(() => import(`./order-management/schedule-order/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management`} component={lazy(() => import(`./inquiry-management/InquiryManagement`))} />
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management/new-inquiry`} component={lazy(() => import(`./inquiry-management/AddInquiry/AddInquiry`))} />
      
        <Route exact path={`${APP_PREFIX_PATH}/inquiry-management/inquiry-details/:id`} component={lazy(() => import(`./inquiry-management/InquiryDetails/InquiryDetails`))} />
        <Route exact path={`${APP_PREFIX_PATH}/technician-management`} component={lazy(() => import(`./technician-management`))} />
        <Route exact path={`${APP_PREFIX_PATH}/technician-management/addNew`} component={lazy(() => import(`./technician-management/AddNew/AddNew`))} />
        <Route exact path={`${APP_PREFIX_PATH}/technician-management/edit/:id`} component={lazy(() => import(`./technician-management/AddNew/AddNew`))} />



        <Route exact path={`${APP_PREFIX_PATH}/operator-master/operational-areas`} component={lazy(() => import(`./operational-areas/operational-area`))} />
        <Route exact path={`${APP_PREFIX_PATH}/operator-master/operational-areas/add-new`} component={lazy(() => import(`./operational-areas/add-new/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/operator-master/operational-areas/edit/:id`} component={lazy(() => import(`./operational-areas/add-new/index`))} />

        <Route exact path={`${APP_PREFIX_PATH}/operator-master/jobsites`} component={lazy(() => import(`./jobsites/Jobsite`))} />
        <Route exact path={`${APP_PREFIX_PATH}/operator-master/jobsites/add-new`} component={lazy(() => import(`./jobsites/AddNew/AddNew`))} />
        <Route exact path={`${APP_PREFIX_PATH}/operator-master/jobsites/edit/:id`} component={lazy(() => import(`./jobsites/AddNew/AddNew`))} /> 
    
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors`} component={lazy(() => import(`./machine-and-sensor`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/life-cycle-management/add-new-life-cycle-event/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/add-new-life-cycle-event`))} /> 
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/life-cycle-management/edit-life-cycle-event/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/add-new-life-cycle-event`))} /> 
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/view-reports/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-reports/Index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/misc-files/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/view-past-event/:id`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-past-event`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensor/misc-files/:id/add-new`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/add-new`} component={lazy(() => import(`./machine-and-sensor/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/edit/:id`} component={lazy(() => import(`./machine-and-sensor/add-new`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/add-new/:id`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/edit-sensor/:id/:editId`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/edit.js`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-list/:id`} component={lazy(() => import(`./machine-and-sensor/view-sensor`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/sensor-analysis/:machineId/:sensorId`} component={lazy(() => import(`./machine-and-sensor/sensor-analysis`))} />


        {/* <Route exact path={`${APP_PREFIX_PATH}/machine-range/edit/:id`} component={lazy(() => import(`./machine-range/add-new/index`))} /> */}
        {/* <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details`} component={lazy(() => import(`./machine-and-sensor/machine-details/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/view-past-event`} component={lazy(() => import(`./machine-and-sensor/machine-details/view-past-event/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/misc`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/misc/add-new`} component={lazy(() => import(`./machine-and-sensor/machine-details/misc-files/add-new/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensors/:id`} component={lazy(() => import(`./machine-and-sensor/view-sensor/index`))} />
       
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensors/add-new/:id`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/sensors/edit-sensor/:id/:editId`} component={lazy(() => import(`./machine-and-sensor/add-new-sensor/edit.js`))} />
        <Route exact path={`${APP_PREFIX_PATH}/life-cycle`} component={lazy(() => import(`./machine-and-sensor/machine-details/add-new-life-cycle-event/index`))} /> */}
        <Route exact path={`${APP_PREFIX_PATH}/reports`} component={lazy(() => import(`./Reports/Index`))} />
        <Route exact path={`${APP_PREFIX_PATH}/machine-and-sensors/machine-details/analysisReport/:id/:graphType/:bin/:xAxis/:yAxis`} component={lazy(() => import(`./machine-and-sensor/machine-details/graphType`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${localStorage.getItem("dashboardType") != "workshop" ? `${APP_PREFIX_PATH}/dashboard` : `${APP_PREFIX_PATH}/machine-and-sensors`}`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);