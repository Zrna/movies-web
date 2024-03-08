import { screen } from '@testing-library/react';

import { theme } from '~/ui';
import { expectTextVariant, renderWithTheme } from '~/utils/tests';

import { Text } from './';

describe('Text', () => {
  it('should render', () => {
    renderWithTheme(
      <Text as="p" color="primary" data-testid="text" variant="paragraph-big">
        Text Paragraph Big
      </Text>,
    );

    expect(screen.getByTestId('text')).toMatchSnapshot();
  });

  describe('variant', () => {
    it('should apply default vairant', () => {
      const defaultVariant = 'paragraph-default';
      renderWithTheme(<Text data-testid="text">Text</Text>);

      expectTextVariant(screen.getByTestId('text'), defaultVariant);
    });

    it('should apply supported variants', () => {
      const variants = Object.keys(theme.text) as theme.TextVariant[];
      variants.forEach((variant) => {
        const testId = `${variant}-testId`;
        renderWithTheme(
          <Text data-testid={testId} variant={variant}>
            Text
          </Text>,
        );

        expectTextVariant(screen.getByTestId(testId), variant);
      });
    });
  });

  describe('other', () => {
    it('should support `as` prop', () => {
      renderWithTheme(
        <Text as="h1" data-testid="text1">
          Text1
        </Text>,
      );
      renderWithTheme(
        <Text as="span" data-testid="text2">
          Text2
        </Text>,
      );
      renderWithTheme(
        <Text as="p" data-testid="text3">
          Text3
        </Text>,
      );
      renderWithTheme(
        <Text as="input" data-testid="text4" placeholder="Test placeholder" value="test" onChange={() => null} />,
      );

      const href = 'https://google.com';
      renderWithTheme(
        <Text as="a" data-testid="text5" {...{ href }}>
          Text5
        </Text>,
      );

      expect(screen.getByTestId('text1').tagName.toLowerCase()).toBe('h1');
      expect(screen.getByTestId('text2').tagName.toLowerCase()).toBe('span');
      expect(screen.getByTestId('text3').tagName.toLowerCase()).toBe('p');
      expect(screen.getByTestId('text4').tagName.toLowerCase()).toBe('input');
      expect(screen.getByTestId('text5').tagName.toLowerCase()).toBe('a');
      expect(screen.getByTestId('text5')).toHaveAttribute('href', href);
    });

    it('should support `sx` prop', () => {
      const customStyles = { textDecoration: 'underline', textOverflow: 'ellipsis', overflow: 'hidden' };
      renderWithTheme(
        <Text data-testid="text" sx={customStyles}>
          Text
        </Text>,
      );

      expect(screen.getByTestId('text')).toHaveStyle(customStyles);
    });
  });
});
