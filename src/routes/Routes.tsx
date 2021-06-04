import { Route, Switch } from 'react-router-dom';

import { DashboardPage, HomePage, LoginPage } from '~/pages';
import { FlexLayout, Text } from '~/ui';

import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
  return (
    <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
      <Switch>
        <ProtectedRoute component={DashboardPage} path="/dashboard" />
        <Route component={LoginPage} exact path="/login" />
        <Route component={HomePage} exact path="/" />
        <Route path="*" render={() => <Text variant="display-heading-xl">404 Page Not Found</Text>} />
      </Switch>
    </FlexLayout>
  );
};
