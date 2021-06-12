import { Redirect, Route, RouteProps } from 'react-router-dom';

import { CenteredLoadingSpinner } from '~/components';
import { useAccessToken, useAccount } from '~/hooks';

interface ProtectedRouteProps extends RouteProps {
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, ...rest }) => {
  const accessToken = useAccessToken();
  const { isLoading: isLoadingAccount } = useAccount();

  if (accessToken) {
    if (isLoadingAccount) {
      return <CenteredLoadingSpinner />;
    }

    return <Route {...rest} path={path} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/login" />;
};
