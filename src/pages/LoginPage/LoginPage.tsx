import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { login } from '~/api';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Text, TextInput } from '~/ui';

export const LoginPage = () => {
  const history = useHistory();
  const hasAccessToken = useAccessToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (hasAccessToken) {
    return <Redirect to="/dashboard" />;
  }

  const handleLoginSubmit = () => {
    setError('');
    setIsLoading(true);

    login({
      email,
      password,
    })
      .then(() => history.push('/dashboard'))
      .catch((err) => {
        const errorMessage = err.reponse ? err.response.data.error : 'Something went wrong. Try again.';
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FlexLayout alignItems="center" flexDirection="column" justifyContent="center" m={6}>
      <FlexLayout alignItems="center" bg="black" flexDirection="column" p={6} space={6}>
        <Text color="white" variant="display-heading-l">
          Login
        </Text>
        {error && <ErrorMessage text={error} />}
        <FlexLayout as="form" flexDirection="column" space={4} sx={{ width: ['100%', '500px'] }}>
          <TextInput label="Email" type="email" value={email} onChange={setEmail} />
          <TextInput
            iconRight={showPassword ? 'eyeOff' : 'eye'}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            onClickRightIcon={() => setShowPassword(!showPassword)}
          />
          <Button
            isDisabled={!email || !password}
            isLoading={isLoading}
            text="Submit"
            variant="primary"
            onClick={handleLoginSubmit}
          />
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
};
