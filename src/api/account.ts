import { backend } from '~/services';

export interface AccountData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAccountData = async () => {
  return await backend.get<AccountData>('/api/account');
};

export const deleteAccount = async () => {
  return await backend.delete<true>('/api/account');
};
