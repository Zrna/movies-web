import { useState } from 'react';
import { Form } from 'react-final-form';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { register, RegisterArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Text } from '~/ui';
import { getErrorMessage, sleep, validator } from '~/utils';

import { Captcha } from './Captcha';

export const RegistrationPage = () => {
  const history = useHistory();
  const hasAccessToken = useAccessToken();
  const [error, setError] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  if (hasAccessToken) {
    return <Redirect to="/dashboard" />;
  }

  const handleRegisterSubmit = async (data: RegisterArgs) => {
    setError('');

    await sleep(1000);
    register(data)
      .then(() => history.push('/dashboard'))
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      });
  };

  return (
    <FlexLayout alignItems="center" flexDirection="column" justifyContent="center" m={6}>
      <FlexLayout alignItems="center" bg="black" flexDirection="column" p={6} space={6}>
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
                space={4}
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
                <Captcha onChange={(value: boolean) => setIsCaptchaValid(value)} />
                <Button
                  isDisabled={isSubmitDisabled || hasValidationErrors || !isCaptchaValid}
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
        <Text color="primary">
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
