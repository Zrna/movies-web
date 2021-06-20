import isEqual from 'lodash/isEqual';
import { Form } from 'react-final-form';
import { Link, Redirect } from 'react-router-dom';

import { BackToLink, FormTextInput } from '~/components';
import { useAccount } from '~/hooks';
import { Button, FlexLayout, Text, useScreenType } from '~/ui';
import { validator } from '~/utils';

export const AccountPage = () => {
  const { isMobile } = useScreenType();
  const { account, error, deleteAccount, updateAccount } = useAccount();

  if (error || !account) {
    return <Redirect to="/" />;
  }

  const { email, firstName, lastName } = account;

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <BackToLink text="back to dashboard" to="/dashboard" />
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
                isFullWidth={isMobile}
                isLoading={submitting}
                text="Update account"
                type="submit"
              />
            </FlexLayout>
          );
        }}
        onSubmit={(data) => updateAccount(data)}
      />
      <FlexLayout flexDirection="column" space={5} sx={{ width: '200px' }}>
        <Text color="red-500" variant="text-m" onClick={deleteAccount}>
          Delete account
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
