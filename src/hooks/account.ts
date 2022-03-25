import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  const { data, error, isLoading, refetch } = useQuery('account', getAccountData);
  const history = useHistory();

  const { unauthorizedRedirect, path } = args;

  useEffect(() => {
    if (unauthorizedRedirect && !isLoading && !data) {
      history.push(path ?? '/login');
    }
  }, [data, isLoading, unauthorizedRedirect, path]);

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation(updateAccount, {
    onMutate: (updatedData) => {
      const oldData = queryClient.getQueryData('account');

      queryClient.setQueryData('account', updatedData);

      return () => queryClient.setQueryData('account', oldData);
    },
    onSuccess: (updatedData) => {
      if (queryClient.getQueryData('account')) {
        queryClient.setQueryData('account', updatedData);
      } else {
        queryClient.invalidateQueries('account');
      }
      showToast({ text: 'Account updated.', variant: 'success' });
    },
    onError: (err: AxiosError, updatedData, rollback: any) => {
      if (rollback) rollback();
      return showErrorToast(err);
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const logout = useLogout();

  return useMutation(deleteAccount, {
    onSuccess: () => {
      queryClient.clear();
      logout();
      showToast({ text: 'Account successfully deleted.', variant: 'success' });
    },
    onError: (err: AxiosError) => {
      return showErrorToast(err);
    },
  });
}
