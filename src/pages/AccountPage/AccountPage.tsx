import { useQuery } from 'react-query';
import { Link, Redirect } from 'react-router-dom';

import { getAccountData } from '~/api';
import { CenteredLoadingSpinner } from '~/components';
import { FlexLayout, Text, TextInput } from '~/ui';

export const AccountPage = () => {
  const { data: account, error, isLoading } = useQuery('account', getAccountData);

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
      <FlexLayout flexDirection="row" space={5}>
        <Link to="/dashboard">Go to Dashboard</Link>
      </FlexLayout>
    </FlexLayout>
  );
};
