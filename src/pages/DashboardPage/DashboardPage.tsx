import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import { Button, FlexLayout, Text } from '~/ui';

export const DashboardPage = () => {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('access-token');
    history.push('/login');
  };

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
      <Button text="Logout" onClick={handleLogout} />
    </FlexLayout>
  );
};
