import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

export function useLogout() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return () => {
    Cookies.remove('access-token');
    queryClient.removeQueries();
    push('/login');
  };
}
