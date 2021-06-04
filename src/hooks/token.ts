import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';

interface UseAccessTokenArgs {
  decoded?: boolean;
}

export function useAccessToken(args?: UseAccessTokenArgs) {
  const accessToken = Cookies.get('access-token');

  if (accessToken && args?.decoded) {
    return decode(accessToken);
  }

  return accessToken;
}
