import { AxiosError, isAxiosError } from 'axios';

import { showToast } from '~/ui';

export const getErrorMessage = (error: AxiosError | Error) => {
  if (isAxiosError(error)) {
    return Array.isArray(error.response?.data.message) ? error.response?.data.message[0] : error.response?.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'Something went wrong';
  }
};

/* c8 ignore start */
export function showErrorToast(error: AxiosError) {
  showToast({
    variant: 'error',
    text: getErrorMessage(error),
  });
}
/* c8 ignore end */
