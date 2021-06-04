import { backend } from '~/services';

interface LoginArgs {
  email: string;
  password: string;
}

export const login = async (args: LoginArgs) => {
  return await backend.post('/login', args);
};
