import { useQuery } from 'react-query';
import { Link, Redirect } from 'react-router-dom';

import { deleteAccount, getAccountData } from '~/api';
import { CenteredLoadingSpinner, TextWithIcon } from '~/components';
import { useLogout } from '~/hooks';
import { FlexLayout, showToast, Text, TextInput } from '~/ui';
import { showErrorToast } from '~/utils';

export const AccountPage = () => {
  const { data: account, error, isLoading } = useQuery('account', getAccountData);
  const logout = useLogout();

  const handleDeleteAccount = () => {
    deleteAccount()
      .then(() => {
        logout();
        showToast({ text: 'Account successfully deleted.', variant: 'success' });
      })
      .catch((err) => showErrorToast(err));
  };

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (error || !account) {
    return <Redirect to="/" />;
  }

  const { email, firstName, lastName } = account;

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Account
      </Text>
      <FlexLayout as="form" flexDirection="column" mb={2} space={4} sx={{ width: ['100%', '500px'] }}>
        <TextInput isDisabled label="First name" value={firstName} onChange={() => undefined} />
        <TextInput isDisabled label="Last name" value={lastName} onChange={() => undefined} />
        <TextInput iconRight="lock" isDisabled label="Email" value={email} onChange={() => undefined} />
      </FlexLayout>
      <FlexLayout flexDirection="column" space={5}>
        <Link to="/dashboard">
          <TextWithIcon iconLeft="arrowLeft" text="Go to Dashboard" />
        </Link>
        <Text color="red-500" variant="text-m" onClick={handleDeleteAccount}>
          Delete account
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
