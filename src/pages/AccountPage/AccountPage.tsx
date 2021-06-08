import isEqual from 'lodash/isEqual';
import { Form } from 'react-final-form';
import { useQuery, useQueryClient } from 'react-query';
import { Link, Redirect } from 'react-router-dom';

import { deleteAccount, getAccountData, updateAccount } from '~/api';
import { CenteredLoadingSpinner, FormTextInput, TextWithIcon } from '~/components';
import { useLogout } from '~/hooks';
import { Button, FlexLayout, showToast, Text } from '~/ui';
import { showErrorToast } from '~/utils';

interface UpdateAccountProps {
  email: string;
  firstName: string;
  lastName: string;
}

export const AccountPage = () => {
  const { data: account, error, isLoading, refetch: refetchAccount } = useQuery('account', getAccountData);
  const queryClient = useQueryClient();
  const logout = useLogout();

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (error || !account) {
    return <Redirect to="/" />;
  }

  const { email, firstName, lastName } = account;

  const handleDeleteAccount = () => {
    deleteAccount()
      .then(() => {
        logout();
        showToast({ text: 'Account successfully deleted.', variant: 'success' });
      })
      .catch((err) => showErrorToast(err));
  };

  const handleUpdateAccount = async (data: UpdateAccountProps) => {
    const { firstName, lastName } = data;

    updateAccount({ firstName, lastName })
      .then(() => {
        queryClient.invalidateQueries('account');
        refetchAccount();
        showToast({ text: 'Account updated.', variant: 'success' });
      })
      .catch((err) => showErrorToast(err));
  };

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Account
      </Text>
      <Form
        initialValues={{ email, firstName, lastName }}
        render={({ handleSubmit, submitting, initialValues, values }) => {
          const valuesNotChanged = isEqual(initialValues, values);

          return (
            <FlexLayout
              as="form"
              flexDirection="column"
              mb={2}
              space={4}
              sx={{ width: ['100%', '500px'] }}
              onSubmit={handleSubmit}
            >
              <FormTextInput label="First name" name="firstName" />
              <FormTextInput label="Last name" name="lastName" />
              <FormTextInput iconRight="lock" isDisabled label="Email" name="email" />
              <Button
                isDisabled={valuesNotChanged || !values.firstName || !values.lastName}
                isLoading={submitting}
                text="Update"
                type="submit"
              />
            </FlexLayout>
          );
        }}
        onSubmit={handleUpdateAccount}
      />
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
