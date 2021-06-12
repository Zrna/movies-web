import { useState } from 'react';
import { Form } from 'react-final-form';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { login, LoginArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Text } from '~/ui';
import { getErrorMessage, sleep, validator } from '~/utils';

export const LoginPage = () => {
  const history = useHistory();
  const hasAccessToken = useAccessToken();

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
      .then(() => history.push('/dashboard'))
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      });
  };

  return (
    <FlexLayout alignItems="center" flexDirection="column" justifyContent="center" m={6}>
      <FlexLayout alignItems="center" bg="black" flexDirection="column" p={6} space={6}>
        <Text color="white" variant="display-heading-l">
          Login
        </Text>
        {error && <ErrorMessage text={error} />}
        <Form
          render={({ handleSubmit, hasValidationErrors, submitting }) => (
            <FlexLayout
              as="form"
              flexDirection="column"
              space={4}
              sx={{ width: ['100%', '500px'] }}
              onSubmit={handleSubmit}
            >
              <FormTextInput label="Email" name="email" type="text" validate={validator.isEmail()} />
              <FormPasswordInput
                label="Password"
                name="password"
                validate={validator.isEmpty("Field can't be empty")}
              />
              <Button
                isDisabled={hasValidationErrors || submitting}
                isFullWidth
                isLoading={submitting}
                text="Log in"
                type="sumbit"
                variant="primary"
              />
            </FlexLayout>
          )}
          onSubmit={handleLoginSubmit}
        />
        <Text color="primary" variant="text-m">
          Don’t have an account? <Link to="/register">Create one</Link>
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
