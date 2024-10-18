import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '~/api';
import { FormTextInput } from '~/components/form-new';
import { RegisterProps } from '~/interfaces/auth';
import { Button, ErrorMessage, FlexLayout, Text } from '~/ui';
import { getErrorMessage, sleep } from '~/utils';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
  firstName: z.string().min(2, 'First name must contain at least 2 characters'),
  lastName: z.string().min(2, 'Last name must contain at least 2 characters'),
});

export default function RegistrationPage() {
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterSubmit = async (data: RegisterProps) => {
    setError('');

    await sleep(1000);
    await register(data)
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
        <FlexLayout as="form" flexDirection="column" space={5} sx={{ width: ['100%', '500px'] }}>
          <FormTextInput control={control} label="First name" name="firstName" />
          <FormTextInput control={control} label="Last Name" name="lastName" />
          <FormTextInput control={control} label="Email" name="email" />
          <FormTextInput
            autoComplete="on"
            control={control}
            iconRight={showPassword ? 'eyeOff' : 'eye'}
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onClickRightIcon={() => setShowPassword(!showPassword)}
          />
          <Button
            isFullWidth
            isLoading={isSubmitting}
            text="Create account"
            type="sumbit"
            variant="primary"
            onClick={handleSubmit(async (data) => handleRegisterSubmit(data))}
          />
        </FlexLayout>
        <Text>
          Already have an account? <NextLink href="/login">Sign in</NextLink>
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
}
