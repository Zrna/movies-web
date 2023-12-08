export function isExternalUrl(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:');
}

export function getUrlDomain(url: string | URL) {
  return url.toString().replace(/.+\/\/|www.|\..+/g, '');
}

export const addUrlProtocol = (url: string) => {
  return url.startsWith('http') ? url : `https://${url}`;
};
