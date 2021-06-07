import { backend } from '~/services';

export interface LoginArgs {
  email: string;
  password: string;
}

export const login = async (args: LoginArgs) => {
  return await backend.post('/login', args);
};
