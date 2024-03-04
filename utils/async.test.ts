import { sleep } from './async';

describe('Async', () => {
  describe('sleep function', () => {
    it('should delay for specified time', async () => {
      const before = Date.now();
      await sleep(1000);
      const after = Date.now();
      const delay = after - before;

      expect(delay).toBeGreaterThanOrEqual(1000);
    });
  });
});
