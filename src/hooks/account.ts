import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { deleteAccount, getAccountData, updateAccount } from '~/api';
import { showToast } from '~/ui';
import { showErrorToast } from '~/utils';

import { useLogout } from './index';

interface UseAccountArgs {
  unauthorizedRedirect: boolean;
  path?: string;
}

export function useAccount(args: UseAccountArgs = { unauthorizedRedirect: false }) {
  const { data: account, error, isLoading, refetch: refetchAccount } = useQuery('account', getAccountData);
  const history = useHistory();
  const logout = useLogout();
  const queryClient = useQueryClient();

  const { unauthorizedRedirect, path } = args;

  useEffect(() => {
    if (unauthorizedRedirect && !isLoading && !account) {
      history.push(path ?? '/login');
    }
  }, [account, isLoading, unauthorizedRedirect, path]);

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteAccount();
        logout();
        showToast({ text: 'Account successfully deleted.', variant: 'success' });
      } catch (err) {
        return showErrorToast(err);
      }
    }
  };

  const handleUpdateAccount = async (data: any) => {
    const { firstName, lastName } = data;

    try {
      await updateAccount({ firstName, lastName });
      queryClient.invalidateQueries('account');
      showToast({ text: 'Account updated.', variant: 'success' });
    } catch (err) {
      return showErrorToast(err);
    }
  };

  return {
    account,
    error,
    isLoading,
    refetchAccount,
    deleteAccount: handleDeleteAccount,
    updateAccount: handleUpdateAccount,
  };
}
