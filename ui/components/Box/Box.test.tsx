import { screen } from '@testing-library/react';

import { theme } from '~/ui';
import { expectTextVariant, getThemeColorString, renderWithTheme, userEvent } from '~/utils/tests';

import { Box } from './Box';

describe('Box', () => {
  it('should render', () => {
    renderWithTheme(
      <Box as="span" bg="dark" color="white" data-testid="box" isDisabled mx="auto" px={2} py={4} onClick={console.log}>
        <p>
          some <strong>strong</strong>
          content
        </p>
      </Box>,
    );

    expect(screen.getByTestId('box')).toMatchSnapshot();
  });

  describe('Margins', () => {
    it('should apply proper margins', () => {
      renderWithTheme(
        <Box data-testid="box1" m={2}>
          Box 1
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box2" m="auto">
          Box 2
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box3" m={-4}>
          Box 3
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box4" m="10vw">
          Box 4
        </Box>,
      );

      expect(screen.getByTestId('box1')).toHaveStyle({ margin: '8px' });
      expect(screen.getByTestId('box2')).toHaveStyle({ margin: 'auto' });
      expect(screen.getByTestId('box3')).toHaveStyle({ margin: '-16px' });
      expect(screen.getByTestId('box4')).toHaveStyle({ margin: '10vw' });
    });

    it('should apply proper horizontal and vertical margins', () => {
      renderWithTheme(
        <Box data-testid="box" mx={4} my={2}>
          Box
        </Box>,
      );

      expect(screen.getByTestId('box')).toHaveStyle({
        marginLeft: '16px',
        marginRight: '16px',
        marginTop: '8px',
        marginBottom: '8px',
      });
    });

    it('should apply proper directional margins', () => {
      renderWithTheme(
        <Box data-testid="box" mb={4} ml={1} mr={2} mt={3}>
          Box
        </Box>,
      );

      expect(screen.getByTestId('box')).toHaveStyle({
        marginLeft: '4px',
        marginRight: '8px',
        marginTop: '12px',
        marginBottom: '16px',
      });
    });

    it('should overwrite margins correctly', () => {
      renderWithTheme(
        <Box data-testid="box1" mt={4} my={2}>
          Box 1
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box2" ml={2} mx={4}>
          Box 2
        </Box>,
      );

      expect(screen.getByTestId('box1')).toHaveStyle({
        marginBottom: '8px',
        marginTop: '8px',
      });
      expect(screen.getByTestId('box2')).toHaveStyle({
        marginLeft: '16px',
        marginRight: '16px',
      });
    });
  });

  describe('paddings', () => {
    it('should apply proper padding', () => {
      renderWithTheme(
        <Box data-testid="box1" p={2}>
          Box 1
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box2" p="10vw">
          Box 2
        </Box>,
      );

      expect(screen.getByTestId('box1')).toHaveStyle({ padding: '8px' });
      expect(screen.getByTestId('box2')).toHaveStyle({ padding: '10vw' });
    });

    it('should apply proper horizontal and vertical padding', () => {
      renderWithTheme(
        <Box data-testid="box" px={4} py={2}>
          Box
        </Box>,
      );

      expect(screen.getByTestId('box')).toHaveStyle({
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
      });
    });

    it('should apply proper directional paddings', () => {
      renderWithTheme(
        <Box data-testid="box" pb={4} pl={1} pr={2} pt={3}>
          Box
        </Box>,
      );

      expect(screen.getByTestId('box')).toHaveStyle({
        paddingLeft: '4px',
        paddingRight: '8px',
        paddingTop: '12px',
        paddingBottom: '16px',
      });
    });

    it('should overwrite paddings correctly', () => {
      renderWithTheme(
        <Box data-testid="box1" pt={4} py={2}>
          Box 1
        </Box>,
      );
      renderWithTheme(
        <Box data-testid="box2" pl={2} px={4}>
          Box 2
        </Box>,
      );

      expect(screen.getByTestId('box1')).toHaveStyle({
        paddingBottom: '8px',
        paddingTop: '8px',
      });
      expect(screen.getByTestId('box2')).toHaveStyle({
        paddingLeft: '16px',
        paddingRight: '16px',
      });
    });
  });

  describe('colors', () => {
    it('should apply proper colors', () => {
      renderWithTheme(
        <Box bg="dimmed" color="primary" data-testid="box" mt={2}>
          Box
        </Box>,
      );
      const element = screen.getByTestId('box');

      expect(element).toHaveStyleRule('background-color', getThemeColorString('dimmed'));
      expect(element).toHaveStyleRule('color', getThemeColorString('primary'));
    });
  });

  describe('sx', () => {
    it('should apply sx prop correctly', () => {
      const variant = 'paragraph-default';

      renderWithTheme(
        <Box
          data-testid="box"
          sx={{
            border: `2px solid ${theme.colors['white-alpha-25']}`,
            borderRadius: '20px',
            height: '72px',
            variant: `text.${variant}`,
          }}
        >
          Box
        </Box>,
      );

      expect(screen.getByTestId('box')).toHaveStyle({
        border: '2px solid rgba(255, 255, 255, 0.25)',
        borderRadius: '20px',
        height: '72px',
      });

      expectTextVariant(screen.getByTestId('box'), variant);
    });
  });

  describe('`as` props', () => {
    it('should correctly render passed element', () => {
      renderWithTheme(
        <Box as="h1" data-testid="box1">
          Box1
        </Box>,
      );
      renderWithTheme(
        <Box as="span" data-testid="box2">
          Box2
        </Box>,
      );
      renderWithTheme(
        <Box as="p" data-testid="box3">
          Box3
        </Box>,
      );
      renderWithTheme(
        <Box as="input" data-testid="box4" placeholder="Test placeholder" value="test" onChange={() => null} />,
      );

      const href = 'https://google.com';
      renderWithTheme(
        <Box as="a" data-testid="box5" {...{ href }}>
          Box5
        </Box>,
      );

      expect(screen.getByTestId('box1').tagName.toLowerCase()).toBe('h1');
      expect(screen.getByTestId('box2').tagName.toLowerCase()).toBe('span');
      expect(screen.getByTestId('box3').tagName.toLowerCase()).toBe('p');
      expect(screen.getByTestId('box4').tagName.toLowerCase()).toBe('input');
      expect(screen.getByTestId('box5').tagName.toLowerCase()).toBe('a');
      expect(screen.getByTestId('box5')).toHaveAttribute('href', href);
    });
  });

  describe('interaction', () => {
    it('should be clickable with pointer cursor', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      renderWithTheme(
        <Box data-testid="box" onClick={onClick}>
          Box
        </Box>,
      );

      const element = screen.getByTestId('box');
      expect(element).toHaveStyle({ cursor: 'pointer' });

      await user.click(element);
      await user.click(element);
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should call onOutsideClick when clicked outside', async () => {
      const handleOutsideClick = jest.fn();
      renderWithTheme(
        <Box data-testid="box" onOutsideClick={handleOutsideClick}>
          Click outside me
        </Box>,
      );

      await userEvent.click(document.body);
      expect(handleOutsideClick).toHaveBeenCalled();
    });

    it('should not call onOutsideClick when clicked inside', async () => {
      const handleOutsideClick = jest.fn();
      renderWithTheme(
        <Box data-testid="box" onOutsideClick={handleOutsideClick}>
          Click inside me
        </Box>,
      );

      await userEvent.click(screen.getByTestId('box'));
      expect(handleOutsideClick).not.toHaveBeenCalled();
    });
  });
});
