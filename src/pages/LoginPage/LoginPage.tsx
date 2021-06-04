import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '~/api';
import { Button, FlexLayout, Text, TextInput } from '~/ui';

export const LoginPage = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = () => {
    login({
      email,
      password,
    })
      .then(() => history.push('/dashboard'))
      .catch((err) => console.log('err', err));
  };

  return (
    <FlexLayout alignItems="center" flexDirection="column" justifyContent="center" m={6}>
      <FlexLayout
        alignItems="center"
        bg="black"
        flexDirection="column"
        p={6}
        space={4}
        sx={{ width: ['100%', '500px'] }}
      >
        <Text color="white" variant="display-heading-l">
          Login
        </Text>
        <TextInput label="Email" type="email" value={email} onChange={setEmail} />
        <TextInput
          iconRight={showPassword ? 'eyeOff' : 'eye'}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          onClickRightIcon={() => setShowPassword(!showPassword)}
        />
        <Button isDisabled={!email || !password} text="Submit" variant="primary" onClick={handleLoginSubmit} />
      </FlexLayout>
    </FlexLayout>
  );
};
