import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-final-form';

import { login, LoginArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Only, Text } from '~/ui';
import { getErrorMessage, sleep, validator } from '~/utils';

export default function LoginPage() {
  const { push, query } = useRouter();
  const hasAccessToken = useAccessToken();

  const [error, setError] = useState('');

  if (hasAccessToken) {
    push('/dashboard');
    return null;
  }

  const handleLoginSubmit = async ({ email, password }: LoginArgs) => {
    setError('');

    await sleep(1000);
    login({
      email,
      password,
    })
      .then(() => {
        const lastLocation = query.redirectTo;
        push(`/${lastLocation ?? 'dashboard'}`);
        return;
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      });
  };

  return (
    <FlexLayout alignItems="center" justifyContent="center" space={6}>
      <FlexLayout alignItems="center" flexDirection="column" sx={{ width: ['100%', '50%'] }}>
        <FlexLayout bg="black" data-testid="login-form" flexDirection="column" p={5} space={6}>
          <Text color="white" variant="headline-h2">
            Sign In
          </Text>
          {error && <ErrorMessage text={error} />}
          <Form
            render={({ handleSubmit, hasValidationErrors, submitting }) => (
              <FlexLayout
                as="form"
                flexDirection="column"
                space={5}
                sx={{ width: ['100%', '500px'] }}
                onSubmit={handleSubmit}
              >
                <FormTextInput
                  data-testid="login-email"
                  label="Email"
                  name="email"
                  type="text"
                  validate={validator.isEmail()}
                />
                <FormPasswordInput
                  data-testid="login-password"
                  label="Password"
                  name="password"
                  validate={validator.isEmpty("Field can't be empty")}
                />
                <Button
                  data-testid="login-confirm"
                  isDisabled={hasValidationErrors || submitting}
                  isFullWidth
                  isLoading={submitting}
                  text="Sign in"
                  type="sumbit"
                  variant="primary"
                />
              </FlexLayout>
            )}
            onSubmit={handleLoginSubmit}
          />
          <Text sx={{ alignSelf: 'center' }}>
            Don’t have an account yet? <NextLink href="/register">Create Account</NextLink>
          </Text>
        </FlexLayout>
      </FlexLayout>
      <Only for="desktop">
        <img alt="Sign In" src="assets/images/sign-in-background.png" style={{ height: '100vh', width: '50%' }} />
      </Only>
    </FlexLayout>
  );
}
