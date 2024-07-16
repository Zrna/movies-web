import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

import { logout as logoutRequest } from '~/api';

export function useLogout() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const res = await logoutRequest();
      queryClient.removeQueries();
      queryClient.clear();
      push('/login');
      return res;
    } catch (error) {
      throw new Error('Failed to logout');
    }
  };

  return logout;
}
