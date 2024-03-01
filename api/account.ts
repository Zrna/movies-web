import { backend } from '~/services';

import { AccountData, UpdateAccountArgs } from './account.d';

export const getAccountData = async () => {
  return await backend.get<AccountData>('/api/account');
};

export const updateAccount = async (data: UpdateAccountArgs) => {
  const { firstName, lastName } = data;
  return await backend.put<AccountData>('/api/account', { firstName, lastName });
};

export const deleteAccount = async () => {
  return await backend.delete<true>('/api/account');
};
