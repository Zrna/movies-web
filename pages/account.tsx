import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import { Form } from 'react-final-form';

import { BackToLink, FormTextInput } from '~/components';
import { useAccount, useDeleteAccount, useLogout, useUpdateAccount } from '~/hooks';
import { Button, FlexLayout, Text, useModal, useScreenType } from '~/ui';
import { validator } from '~/utils';

export default function AccountPage() {
  const logout = useLogout();

  const { data: account, error, isLoading } = useAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const { mutate: deleteAccount } = useDeleteAccount();
  const { isMobile } = useScreenType();
  const [modal, showModal] = useModal({
    title: 'Delete account',
    content: 'Are you sure you want to delete your account?',
    actionButton: {
      text: 'Delete account',
      action: async () => deleteAccount(),
    },
  });

  useEffect(() => {
    if (!isLoading && (error || !account)) {
      logout();
    }
  }, [account, error]);

  if (!account) {
    return null;
  }

  const { email, firstName, lastName } = account;

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <BackToLink text="Back to All Reviews" to="/dashboard" />
      <Text variant="headline-h2">Account</Text>
      <Form
        initialValues={{ email, firstName, lastName }}
        render={({ handleSubmit, hasValidationErrors, submitting, initialValues, values }) => {
          const valuesNotChanged = isEqual(initialValues, values);

          return (
            <FlexLayout
              as="form"
              flexDirection="column"
              space={5}
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
                isFullWidth={isMobile}
                isLoading={submitting}
                text="Update account"
                type="submit"
              />
            </FlexLayout>
          );
        }}
        onSubmit={(data: any) => updateAccount(data)}
      />
      <FlexLayout flexDirection="column" space={5} sx={{ width: '200px' }}>
        <Text color="dimmed" onClick={showModal}>
          Delete account
        </Text>
      </FlexLayout>
      {modal}
    </FlexLayout>
  );
}
