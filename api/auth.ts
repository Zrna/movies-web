import { LoginProps, RegisterProps } from '~/interfaces/auth';
import { backend } from '~/services';

export const login = async (props: LoginProps) => {
  return await backend.post('/login', props);
};

export const register = async (props: RegisterProps) => {
  return await backend.post<{ accessToken: string; message: 'User registered' }>('/register', props);
};

export const logout = async () => {
  return await backend.post<'Logged out successfully'>('/logout');
};
