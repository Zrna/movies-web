import { getErrorMessage } from './error';

type AxiosError = any;

describe('Error', () => {
  describe('getErrorMessage', () => {
    it('should return first element if error message is an array', () => {
      const error: AxiosError = new Error('Internal Server Error');
      error.isAxiosError = true;
      error.response = {
        status: 500,
        data: {
          message: ['Error Message 1', 'Error Message 2'],
        },
      };

      const message = getErrorMessage(error);

      expect(message).toBe(error.response.data.message[0]);
    });

    it('should return error message if message is string', () => {
      const error: AxiosError = new Error('Internal Server Error');
      error.isAxiosError = true;
      error.response = {
        status: 500,
        data: {
          message: 'Error message 1',
        },
      };

      const message = getErrorMessage(error);

      expect(message).toBe(error.response.data.message);
    });

    it('should return error message if error is not axios error', () => {
      const error: Error = new Error('Internal Server Error');

      const message = getErrorMessage(error);

      expect(message).toBe(error.message);
    });

    it('should return default error message if error is undefined', () => {
      const error: Error = new Error(undefined);

      const message = getErrorMessage(error);

      expect(message).toBe('Something went wrong');
    });
  });
});
