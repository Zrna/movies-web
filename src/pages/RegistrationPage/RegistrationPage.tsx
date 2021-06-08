import { useState } from 'react';
import { Form } from 'react-final-form';
import { Redirect, useHistory } from 'react-router-dom';

import { register, RegisterArgs } from '~/api';
import { FormPasswordInput, FormTextInput } from '~/components';
import { useAccessToken } from '~/hooks';
import { Button, ErrorMessage, FlexLayout, Text } from '~/ui';
import { getErrorMessage, sleep } from '~/utils';

export const RegistrationPage = () => {
  const history = useHistory();
  const hasAccessToken = useAccessToken();
  const [error, setError] = useState('');

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
        <Text color="white" variant="display-heading-l">
          Register
        </Text>
        {error && <ErrorMessage text={error} />}
        <Form
          render={({ handleSubmit, submitting, values }) => {
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
                <FormTextInput label="First name" name="firstName" type="text" />
                <FormTextInput label="Last Name" name="lastName" type="text" />
                <FormTextInput label="Email" name="email" type="email" />
                <FormPasswordInput label="Password" name="password" />
                <Button
                  isDisabled={isSubmitDisabled}
                  isLoading={submitting}
                  text="Submit"
                  type="sumbit"
                  variant="primary"
                />
              </FlexLayout>
            );
          }}
          onSubmit={handleRegisterSubmit}
        />
      </FlexLayout>
    </FlexLayout>
  );
};
