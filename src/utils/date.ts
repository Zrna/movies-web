import { DateTime } from 'luxon';

export function formatDate(date: string, format = 'LLL d, y') {
  return DateTime.fromISO(date).toFormat(format);
}
