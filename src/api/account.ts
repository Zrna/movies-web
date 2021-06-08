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

interface UpdateAccountArgs {
  firstName: string;
  lastName: string;
}

export const updateAccount = async (data: UpdateAccountArgs) => {
  return await backend.put<AccountData>('/api/account', data);
};

export const deleteAccount = async () => {
  return await backend.delete<true>('/api/account');
};
