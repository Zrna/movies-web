import queryString from 'query-string';
import { useState } from 'react';
import { Form } from 'react-final-form';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import { login, LoginArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Only, Text } from '~/ui';
import signInImage from '~/ui/assets/images/sign-in-background.png';
import { getErrorMessage, sleep, validator } from '~/utils';

export const LoginPage = () => {
  const history = useHistory();
  const hasAccessToken = useAccessToken();
  const location = useLocation();

  const [error, setError] = useState('');

  if (hasAccessToken) {
    return <Redirect to="/dashboard" />;
  }

  const handleLoginSubmit = async ({ email, password }: LoginArgs) => {
    setError('');

    await sleep(1000);
    login({
      email,
      password,
    })
      .then(() => {
        const lastLocation = queryString.parse(location.search)?.redirectTo;
        history.push(`/${lastLocation ?? 'dashboard'}`);
        return;
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      });
  };

  return (
    <FlexLayout alignItems="center" justifyContent="center" space={6}>
      <FlexLayout alignItems="center" flexDirection="column" sx={{ width: '50%' }}>
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
            Don’t have an account yet? <Link to="/register">Create Account</Link>
          </Text>
        </FlexLayout>
      </FlexLayout>
      <Only for="desktop">
        <img alt="Sign In" src={signInImage} style={{ height: '100vh', width: '50%' }} />
      </Only>
    </FlexLayout>
  );
};
