import { formatDate } from './date';

const date = '2022-01-15T15:00:00+00:00';

it('should return the date in LLL d, y format', () => {
  expect(formatDate(date)).toBe('Jan 15, 2022');
});

it('should return the date in dd.MM.y format', () => {
  expect(formatDate(date, 'dd.MM.y')).toBe('15.01.2022');
});
