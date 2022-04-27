import { sleep } from './async';

jest.spyOn(global, 'setTimeout');

it('should run function after 2 seconds', () => {
  sleep(2000);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
});
