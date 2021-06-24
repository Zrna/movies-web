import isEmailValidator from 'validator/lib/isEmail';
import isLengthValidator from 'validator/lib/isLength';
import isURLValidator from 'validator/lib/isURL';

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

export const isURL = (message?: string) => (value: string) => {
  if (value) {
    if (value.trim().length > 0 && isURLValidator(value)) {
      return undefined;
    } else {
      return message ?? 'Invalid URL';
    }
  }

  return undefined;
};
