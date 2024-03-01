import { backend } from '~/services';

import { LoginArgs, RegisterArgs } from './auth.d';

export const login = async (args: LoginArgs) => {
  return await backend.post('/login', args);
};

export const register = async (args: RegisterArgs) => {
  return await backend.post<'User registered'>('/register', args);
};
