import isEqual from 'lodash/isEqual';
import { Form } from 'react-final-form';
import { Redirect } from 'react-router-dom';

import { BackToLink, FormTextInput } from '~/components';
import { useAccount, useDeleteAccount, useUpdateAccount } from '~/hooks';
import { Button, FlexLayout, Text, useModal, useScreenType } from '~/ui';
import { validator } from '~/utils';

export const AccountPage = () => {
  const { data: account, error } = useAccount();
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

  if (error || !account) {
    return <Redirect to="/" />;
  }

  const { email, firstName, lastName } = account;

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <BackToLink text="back to dashboard" to="/dashboard" />
      <Text color="primary" variant="headline-h2">
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
        <Text color="alert-error" onClick={showModal}>
          Delete account
        </Text>
      </FlexLayout>
      {modal}
    </FlexLayout>
  );
};
