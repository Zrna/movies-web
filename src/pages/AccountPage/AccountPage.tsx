import isEqual from 'lodash/isEqual';
import { Form } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { Link, Redirect } from 'react-router-dom';

import { deleteAccount, updateAccount } from '~/api';
import { CenteredLoadingSpinner, FormTextInput, TextWithIcon } from '~/components';
import { useAccount, useLogout } from '~/hooks';
import { Button, FlexLayout, showToast, Text } from '~/ui';
import { showErrorToast, validator } from '~/utils';

interface UpdateAccountProps {
  email: string;
  firstName: string;
  lastName: string;
}

export const AccountPage = () => {
  const { account, error, refetchAccount } = useAccount();
  const queryClient = useQueryClient();
  const logout = useLogout();

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
        render={({ handleSubmit, hasValidationErrors, submitting, initialValues, values }) => {
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
              <FormTextInput
                label="First name"
                name="firstName"
                validate={validator.isEmpty("First name can't be empty")}
              />
              <FormTextInput
                label="Last name"
                name="lastName"
                validate={validator.isEmpty("Last name can't be empty")}
              />
              <FormTextInput iconRight="lock" isDisabled label="Email" name="email" />
              <Button
                isDisabled={valuesNotChanged || hasValidationErrors}
                isLoading={submitting}
                text="Update"
                type="submit"
              />
            </FlexLayout>
          );
        }}
        onSubmit={handleUpdateAccount}
      />
      <FlexLayout flexDirection="column" space={5} sx={{ width: '200px' }}>
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
