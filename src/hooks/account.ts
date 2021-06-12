import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import { getAccountData } from '~/api';

interface UseAccountArgs {
  unauthorizedRedirect: boolean;
  path?: string;
}

export function useAccount(args: UseAccountArgs = { unauthorizedRedirect: false }) {
  const history = useHistory();
  const { unauthorizedRedirect, path } = args;
  const { data: account, error, isLoading, refetch: refetchAccount } = useQuery('account', getAccountData);

  useEffect(() => {
    if (unauthorizedRedirect && !isLoading && !account) {
      history.push(path ?? '/login');
    }
  }, [account, isLoading, unauthorizedRedirect, path]);

  return {
    account,
    error,
    isLoading,
    refetchAccount,
  };
}
