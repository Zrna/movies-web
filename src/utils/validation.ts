import isEmailValidator from 'validator/lib/isEmail';
import isLengthValidator from 'validator/lib/isLength';

export const isEmail = () => (value: string) => value && isEmailValidator(value) ? undefined : 'Invalid email format';

export const isEmpty = (message: string) => (value: string) => value && value.trim().length > 0 ? undefined : message;

interface IsLengthOptionsArgs {
  min: number;
  max?: number;
}

export const isLength =
  (message: string, { min, max }: IsLengthOptionsArgs) =>
  (value: string) =>
    value && isLengthValidator(value, { min, max }) ? undefined : message;
