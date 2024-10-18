import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '~/api';
import { FormTextInput } from '~/components/form-new';
import { LoginProps } from '~/interfaces/auth';
import { Button, ErrorMessage, FlexLayout, Only, Text } from '~/ui';
import { getErrorMessage, sleep } from '~/utils';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
});

export default function LoginPage() {
  const { push, query } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async ({ email, password }: LoginProps) => {
    setError('');

    await sleep(1000);
    login({
      email,
      password,
    })
      .then(() => {
        const lastLocation = query.redirectTo as string;
        push(lastLocation ?? '/dashboard');
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
          <FlexLayout as="form" flexDirection="column" space={5} sx={{ width: ['100%', '500px'] }}>
            <FormTextInput control={control} data-testid="login-email" label="Email" name="email" />
            <FormTextInput
              autoComplete="on"
              control={control}
              data-testid="login-password"
              iconRight={showPassword ? 'eyeOff' : 'eye'}
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onClickRightIcon={() => setShowPassword(!showPassword)}
            />
            <Button
              data-testid="login-confirm"
              isDisabled={isSubmitting}
              isFullWidth
              isLoading={isSubmitting}
              text="Sign in"
              type="sumbit"
              variant="primary"
              onClick={handleSubmit(async (data) => handleLoginSubmit(data))}
            />
          </FlexLayout>
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
