import { LoginArgs, RegisterArgs } from '~/interfaces/auth';
import { backend } from '~/services';

export const login = async (args: LoginArgs) => {
  return await backend.post('/login', args);
};

export const register = async (args: RegisterArgs) => {
  return await backend.post<{ accessToken: string; message: 'User registered' }>('/register', args);
};

export const logout = async () => {
  return await backend.post<'Logged out successfully'>('/logout');
};
