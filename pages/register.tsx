import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-final-form';

import { register, RegisterArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Text } from '~/ui';
import { getErrorMessage, sleep, validator } from '~/utils';

export default function RegistrationPage() {
  const { push } = useRouter();
  const hasAccessToken = useAccessToken();
  const [error, setError] = useState('');

  if (hasAccessToken) {
    push('/dashboard');
    return null;
  }

  const handleRegisterSubmit = async (data: RegisterArgs) => {
    setError('');

    await sleep(1000);
    register(data)
      .then(() => push('/dashboard'))
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      });
  };

  return (
    <FlexLayout alignItems="center" flexDirection="column" justifyContent="center">
      <FlexLayout alignItems="center" bg="black" flexDirection="column" p={5} space={6}>
        <Text color="white" variant="headline-h2">
          Register
        </Text>
        {error && <ErrorMessage text={error} />}
        <Form
          render={({ handleSubmit, hasValidationErrors, submitting, values }) => {
            const { email, firstName, lastName, password } = values;
            const isSubmitDisabled = !firstName || !lastName || !email || !password || submitting;

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
                  type="text"
                  validate={validator.isEmpty("First name can't be empty")}
                />
                <FormTextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  validate={validator.isEmpty("Last name can't be empty")}
                />
                <FormTextInput label="Email" name="email" type="text" validate={validator.isEmail()} />
                <FormPasswordInput
                  label="Password"
                  name="password"
                  validate={validator.isLength('Password must be at least 6 characters', { min: 6 })}
                />
                <Button
                  isDisabled={isSubmitDisabled || hasValidationErrors}
                  isFullWidth
                  isLoading={submitting}
                  text="Create account"
                  type="sumbit"
                  variant="primary"
                />
              </FlexLayout>
            );
          }}
          onSubmit={handleRegisterSubmit}
        />
        <Text>
          Already have an account? <NextLink href="/login">Sign in</NextLink>
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
}
