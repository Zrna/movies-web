import { Route, Switch } from 'react-router-dom';

import { HomePage, LoginPage } from '~/pages';
import { FlexLayout, Text } from '~/ui';

export const Routes = () => {
  return (
    <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
      <Switch>
        <Route
          path="/dashboard"
          render={() => (
            <Text color="primary" variant="display-heading-m">
              Dashboard
            </Text>
          )}
        />
        <Route component={LoginPage} exact path="/login" />
        <Route component={HomePage} exact path="/" />
        <Route path="*" render={() => <Text variant="display-heading-xl">404 Page Not Found</Text>} />
      </Switch>
    </FlexLayout>
  );
};
