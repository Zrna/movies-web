import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAccessToken } from '~/hooks';

interface ProtectedRouteProps extends RouteProps {
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, ...rest }) => {
  const accessToken = useAccessToken();

  if (accessToken) {
    return <Route {...rest} path={path} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/login" />;
};
