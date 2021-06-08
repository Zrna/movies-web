import { Route, Switch } from 'react-router-dom';

import { AccountPage, DashboardPage, HomePage, LoginPage, RegistrationPage } from '~/pages';
import { FlexLayout, Text } from '~/ui';

import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
  return (
    <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
      <Switch>
        <ProtectedRoute component={AccountPage} path="/account" />
        <ProtectedRoute component={DashboardPage} path="/dashboard" />
        <Route component={RegistrationPage} exact path="/register" />
        <Route component={LoginPage} exact path="/login" />
        <Route component={HomePage} exact path="/" />
        <Route path="*" render={() => <Text variant="display-heading-xl">404 Page Not Found</Text>} />
      </Switch>
    </FlexLayout>
  );
};
