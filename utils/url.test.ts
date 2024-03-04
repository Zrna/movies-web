import { addUrlProtocol, getUrlDomain, isExternalUrl } from './url';

describe('URL', () => {
  describe('isExternalUrl', () => {
    it('should return true for http URLs', () => {
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('https://example.com')).toBe(true);
    });

    it('should return true for mailto URLs', () => {
      expect(isExternalUrl('mailto:example@example.com')).toBe(true);
    });

    it('should return false for relative URLs', () => {
      expect(isExternalUrl('/relative/path')).toBe(false);
    });

    it('should return false for other protocols', () => {
      expect(isExternalUrl('ftp://example.com')).toBe(false);
    });
  });

  describe('getUrlDomain', () => {
    it('should return "appleTv" for URLs containing "tv.apple"', () => {
      expect(getUrlDomain('http://tv.apple.com')).toBe('appleTv');
      expect(getUrlDomain('https://tv.apple.com')).toBe('appleTv');
    });

    it('should return the domain name for other URLs', () => {
      expect(getUrlDomain('http://example.com')).toBe('example');
      expect(getUrlDomain('https://www.google.com')).toBe('google');
    });

    it('should handle URL objects', () => {
      expect(getUrlDomain(new URL('http://example.com'))).toBe('example');
      expect(getUrlDomain(new URL('https://www.google.com'))).toBe('google');
    });
  });

  describe('addUrlProtocol', () => {
    it('should prepend "https://" to URLs without a protocol', () => {
      expect(addUrlProtocol('example.com')).toBe('https://example.com');
    });

    it('should not change URLs that already have a protocol', () => {
      expect(addUrlProtocol('http://example.com')).toBe('http://example.com');
      expect(addUrlProtocol('https://example.com')).toBe('https://example.com');
    });
  });
});
