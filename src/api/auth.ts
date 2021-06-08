import { backend } from '~/services';

export interface LoginArgs {
  email: string;
  password: string;
}

export const login = async (args: LoginArgs) => {
  return await backend.post('/login', args);
};

export interface RegisterArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const register = async (args: RegisterArgs) => {
  return await backend.post<'User registered'>('/register', args);
};
