import Cookies from 'js-cookie';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { ButtonLink } from '~/components';
import { Button, FlexLayout, Text } from '~/ui';

export const DashboardPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove('access-token');
    queryClient.invalidateQueries('account');
    history.push('/login');
  };

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
      <FlexLayout flexDirection="row" space={5}>
        <ButtonLink text="Account" to="/account" />
        <Button text="Logout" onClick={handleLogout} />
      </FlexLayout>
    </FlexLayout>
  );
};
