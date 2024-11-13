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
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);