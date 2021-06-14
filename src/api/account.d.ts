export interface AccountData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateAccountArgs {
  firstName: string;
  lastName: string;
}
