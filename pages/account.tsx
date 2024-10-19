import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BackToLink, FormTextInput } from '~/components';
import { useAccount, useDeleteAccount, useLogout, useUpdateAccount } from '~/hooks';
import { UpdateAccountArgs } from '~/interfaces/account';
import { Button, FlexLayout, Text, TextInput, useModal, useScreenType } from '~/ui';

const AccountFormSchema = z.object({
  firstName: z.string().min(2, 'First name must contain at least 2 characters'),
  lastName: z.string().min(2, 'Last name must contain at least 2 characters'),
});

export default function AccountPage() {
  const logout = useLogout();
  const { data: account, error, isLoading } = useAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const { mutate: deleteAccount } = useDeleteAccount();

  const { isMobile } = useScreenType();
  const [modal, showModal] = useModal({
    title: 'Delete account',
    content: 'Are you sure you want to delete your account?',
    actionButton: {
      text: 'Delete account',
      action: async () => deleteAccount(),
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateAccountArgs>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    values: account,
  });

  useEffect(() => {
    if (!isLoading && (error || !account)) {
      logout();
    }
  }, [account, error]);

  if (!account) {
    return null;
  }

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <BackToLink text="Back to All Reviews" to="/dashboard" />
      <Text variant="headline-h2">Account</Text>
      <FlexLayout as="form" flexDirection="column" space={5} sx={{ width: ['100%', '500px'] }}>
        <FormTextInput control={control} label="First name" name="firstName" />
        <FormTextInput control={control} label="Last name" name="lastName" />
        <TextInput
          iconRight="lock"
          isDisabled
          label="Email"
          name="email"
          value={account.email || ''}
          onChange={() => undefined}
        />
        <Button
          isFullWidth={isMobile}
          isLoading={isSubmitting}
          text="Update account"
          type="submit"
          onClick={handleSubmit((data) => isDirty && updateAccount(data))}
        />
      </FlexLayout>
      <FlexLayout flexDirection="column" space={5} sx={{ width: '200px' }}>
        <Text color="dimmed" onClick={showModal}>
          Delete account
        </Text>
      </FlexLayout>
      {modal}
    </FlexLayout>
  );
}
