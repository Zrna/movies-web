import { Route, Switch } from 'react-router-dom';

import { HomePage, LoginPage } from '~/pages';
import { Text } from '~/ui';

export const Routes = () => {
  return (
    <Switch>
      <Route component={LoginPage} exact path="/login" />
      <Route component={HomePage} exact path="/" />
      <Route path="*" render={() => <Text variant="display-heading-xl">404 Page Not Found</Text>} />
    </Switch>
  );
};
