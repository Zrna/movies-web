import { Route, Switch } from 'react-router-dom';

import {
  AccountPage,
  CreateReviewPage,
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegistrationPage,
  ReviewPage,
} from '~/pages';
import { FlexLayout } from '~/ui';

import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
  return (
    <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
      <Switch>
        <ProtectedRoute component={AccountPage} exact path="/account" />
        <ProtectedRoute component={CreateReviewPage} exact path="/create-review" />
        <ProtectedRoute component={ReviewPage} exact path="/review/:reviewId" />
        <ProtectedRoute component={DashboardPage} exact path="/dashboard" />
        <Route component={RegistrationPage} exact path="/register" />
        <Route component={LoginPage} exact path="/login" />
        <Route component={HomePage} exact path="/" />
        <Route component={NotFoundPage} path="*" />
      </Switch>
    </FlexLayout>
  );
};
