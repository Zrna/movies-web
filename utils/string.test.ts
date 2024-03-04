import { pluralize } from './string';

describe('String', () => {
  describe('pluralize', () => {
    it('should return the word in the singular', () => {
      expect(pluralize('review', 1)).toBe('review');
    });

    it('should return the word in the plural', () => {
      expect(pluralize('review', 5)).toBe('reviews');
    });
  });
});
