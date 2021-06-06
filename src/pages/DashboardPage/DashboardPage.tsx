import { ButtonLink } from '~/components';
import { useLogout } from '~/hooks';
import { Button, FlexLayout, Text } from '~/ui';

export const DashboardPage = () => {
  const logout = useLogout();

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
      <FlexLayout flexDirection="row" space={5}>
        <ButtonLink text="Account" to="/account" />
        <Button text="Logout" onClick={logout} />
      </FlexLayout>
    </FlexLayout>
  );
};
