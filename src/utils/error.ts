import { AxiosError } from 'axios';

import { showToast } from '~/ui';

export function getErrorMessage(error: AxiosError) {
  if (error.response) {
    return error.response.data.error;
  }

  return 'Something went wrong';
}

export function showErrorToast(error: AxiosError) {
  showToast({
    variant: 'error',
    text: getErrorMessage(error),
  });
}
