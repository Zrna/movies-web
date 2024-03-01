import { isEmail, isEmpty, isLength, isURL } from './validation';

describe('isEmail validation function', () => {
  it('should be valid email format', () => {
    expect(isEmail()('dummy@email.com')).toBeUndefined();
  });

  it('should return invalid email format message', () => {
    expect(isEmail()('dummy@email')).toBe('Invalid email format');
  });
});

describe('isEmpty validation function', () => {
  it('should not be empty value (only whitespace characters)', () => {
    expect(isEmpty('Value cannot be empty')('   ')).toBe('Value cannot be empty');
  });

  it('should have some value', () => {
    expect(isEmpty('Value cannot be empty')('Dummy text')).toBeUndefined();
  });
});

describe('isLength validation function', () => {
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

describe('isURL validation function', () => {
  it('should be valid URL format', () => {
    expect(isURL()('google.com')).toBeUndefined();
    expect(isURL()('www.google.com')).toBeUndefined();
    expect(isURL()('https://google.com')).toBeUndefined();
    expect(isURL()('https://www.google.com')).toBeUndefined();
  });

  it('should return default error message for URL format', () => {
    expect(isURL()('dummy')).toBe('Invalid URL');
  });

  it('should return a custom error message for URL format', () => {
    expect(isURL('Wrong URL format')('dummy')).toBe('Wrong URL format');
  });
});
