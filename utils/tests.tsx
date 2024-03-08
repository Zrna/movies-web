import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'theme-ui';

import { theme } from '~/ui';

export { cleanup, fireEvent, render, userEvent };

export function renderWithTheme(Component: JSX.Element) {
  return render(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);
}

export function getThemeColorString(color: theme.Color) {
  return `var(--theme-ui-colors-${color})`;
}

export function expectTextVariant(element: HTMLElement, variant: theme.TextVariant) {
  const { fontFamily, fontSize, fontStyle, fontWeight, lineHeight } = theme.text[variant];

  expect(element).toHaveStyleRule('font-family', fontFamily);
  expect(element).toHaveStyleRule('font-style', fontStyle);
  expect(element).toHaveStyleRule('font-size', fontSize);
  expect(element).toHaveStyleRule('font-weight', fontWeight.toString());
  expect(element).toHaveStyleRule('line-height', lineHeight);

  if (variant === 'label-uppercase') {
    expect(element).toHaveStyleRule('text-transform', theme.text[variant].textTransform);
  }
}

export function mockWindowMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
