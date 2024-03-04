import { formatDate } from './date';

const date = '2022-01-15T15:00:00+00:00';

describe('Date', () => {
  describe('formatDate', () => {
    it('should return the date in MMMM d, y format', () => {
      expect(formatDate(date, 'MMMM d, y')).toBe('January 15, 2022');
    });

    it('should return the date in y-MM-dd format', () => {
      expect(formatDate(date, 'y-MM-dd')).toBe('2022-01-15');
    });

    it('should return the date in D format', () => {
      expect(formatDate(date, 'd')).toBe('15');
    });

    it('should return the date in y format', () => {
      expect(formatDate(date, 'y')).toBe('2022');
    });

    it('should return Invalid DateTime for an invalid date', () => {
      expect(formatDate('invalid date')).toBe('Invalid DateTime');
    });
  });
});
