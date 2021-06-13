import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import { CenteredLoadingSpinner } from '~/components';
import { useAccessToken, useAccount } from '~/hooks';

interface ProtectedRouteProps extends RouteProps {
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, ...rest }) => {
  const accessToken = useAccessToken();
  const { isLoading: isLoadingAccount } = useAccount();
  const lastLocation = useLocation().pathname.replace('/', '');

  if (accessToken) {
    if (isLoadingAccount) {
      return <CenteredLoadingSpinner />;
    }

    return <Route {...rest} path={path} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to={`/login?redirectTo=${lastLocation}`} />;
};
