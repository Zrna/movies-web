import Cookies from 'js-cookie';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

export function useLogout() {
  const history = useHistory();
  const queryClient = useQueryClient();

  return () => {
    Cookies.remove('access-token');
    queryClient.removeQueries();
    history.push('/login');
  };
}
