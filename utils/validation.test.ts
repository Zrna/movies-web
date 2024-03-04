import { isEmail, isEmpty, isLength, isURL } from './validation';

describe('Validation', () => {
  describe('isEmail', () => {
    it('should be valid email format', () => {
      expect(isEmail()('dummy@email.com')).toBeUndefined();
    });

    it('should return invalid email format message', () => {
      expect(isEmail()('dummy@email')).toBe('Invalid email format');
    });
  });

  describe('isEmpty', () => {
    it('should not be empty value (only whitespace characters)', () => {
      expect(isEmpty('Value cannot be empty')('   ')).toBe('Value cannot be empty');
    });

    it('should have some value', () => {
      expect(isEmpty('Value cannot be empty')('Dummy text')).toBeUndefined();
    });
  });

  describe('isLength', () => {
    it('should return an error message for characters length (min)', () => {
      expect(isLength('Value must be min. 6 characters', { min: 6 })('dummy')).toBe('Value must be min. 6 characters');
    });

    it('should return an error message for characters length (min and max)', () => {
      expect(isLength('Value must be between 6 and 8 characters', { min: 6, max: 8 })('dummy')).toBe(
        'Value must be between 6 and 8 characters',
      );
    });

    it('it should be between min (6) and max (8)', () => {
      expect(isLength('Value must be between 6 and 8 characters', { min: 6, max: 8 })('dummy12')).toBeUndefined();
    });
  });

  describe('isURL', () => {
    it('should return undefined for valid URL', () => {
      expect(isURL()('https://google.com')).toBeUndefined();
      expect(isURL()('http://google.com')).toBeUndefined();
      expect(isURL()('www.google.com')).toBeUndefined();
      expect(isURL()('google.com')).toBeUndefined();
    });

    it('should return default error message for invalid URL', () => {
      expect(isURL()('google')).toBe('Invalid URL');
      expect(isURL()('http:/google.com')).toBe('Invalid URL');
      expect(isURL()('https://google')).toBe('Invalid URL');
    });

    it('should return custom error message for invalid URL', () => {
      expect(isURL('Custom error message')('google')).toBe('Custom error message');
      expect(isURL('Custom error message')('http:/google.com')).toBe('Custom error message');
      expect(isURL('Custom error message')('https://google')).toBe('Custom error message');
    });

    it('should return undefined for empty or null URL', () => {
      expect(isURL()('')).toBeUndefined();
      expect(isURL()(null)).toBeUndefined();
      expect(isURL()(undefined)).toBeUndefined();
    });
  });
});
