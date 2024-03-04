import { AxiosError, isAxiosError } from 'axios';

import { showToast } from '~/ui';

export const getErrorMessage = (error: AxiosError | Error) => {
  if (isAxiosError(error) && error.response) {
    if (Array.isArray(error.response)) {
      return error.response.data.error[0];
    } else {
      return error.response.data.error;
    }
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
