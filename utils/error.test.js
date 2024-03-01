import { getErrorMessage } from './error';

it('should return the default error message', () => {
  expect(getErrorMessage(undefined)).toBe('Something went wrong');
});

it('should extract an error message from the error object', () => {
  const mockAxiosErrorResponse = {
    data: {
      error: 'User does not exist',
    },
    status: 404,
    statusText: 'Not Found',
    headers: {
      'content-length': '31',
      'content-type': 'application/json; charset=utf-8',
    },
    config: {
      url: '/login',
      method: 'post',
      data: '{"email":"dummy@email.com","password":"Dummy123"}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:5001',
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      withCredentials: true,
    },
    request: {},
  };

  expect(getErrorMessage({ response: mockAxiosErrorResponse })).toBe('User does not exist');
});
