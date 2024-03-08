import { screen, within } from '@testing-library/react';

import { mockWindowMatchMedia, renderWithTheme } from '~/utils/tests';

import { FlexLayout } from './FlexLayout';

describe('FlexLayout', () => {
  beforeAll(mockWindowMatchMedia);

  it('should render', () => {
    renderWithTheme(
      <FlexLayout
        alignItems="center"
        data-testid="flex"
        flexDirection="column"
        flexGrow={1}
        flexWrap="wrap"
        justifyContent="space-between"
        space={4}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </FlexLayout>,
    );

    expect(screen.getByTestId('flex')).toMatchSnapshot();
  });

  it('should render flex component', () => {
    renderWithTheme(<FlexLayout data-testid="flex" />);

    expect(screen.getByTestId('flex')).toHaveStyle({ display: 'flex' });
  });

  describe('flex container', () => {
    it('should apply proper direction', () => {
      renderWithTheme(<FlexLayout data-testid="flex1" flexDirection="row" />);
      renderWithTheme(<FlexLayout data-testid="flex2" flexDirection="column" />);
      renderWithTheme(<FlexLayout data-testid="flex3" flexDirection="row-reverse" />);
      renderWithTheme(<FlexLayout data-testid="flex4" flexDirection="column-reverse" />);

      expect(screen.getByTestId('flex1')).toHaveStyle({ flexDirection: 'row' });
      expect(screen.getByTestId('flex2')).toHaveStyle({ flexDirection: 'column' });
      expect(screen.getByTestId('flex3')).toHaveStyle({ flexDirection: 'row-reverse' });
      expect(screen.getByTestId('flex4')).toHaveStyle({ flexDirection: 'column-reverse' });
    });

    it('should align items properly', () => {
      renderWithTheme(<FlexLayout alignItems="center" data-testid="flex1" />);
      renderWithTheme(<FlexLayout alignItems="flex-start" data-testid="flex2" />);
      renderWithTheme(<FlexLayout alignItems="flex-end" data-testid="flex3" />);
      renderWithTheme(<FlexLayout alignItems="stretch" data-testid="flex4" />);
      renderWithTheme(<FlexLayout alignItems="baseline" data-testid="flex5" />);

      expect(screen.getByTestId('flex1')).toHaveStyle({ alignItems: 'center' });
      expect(screen.getByTestId('flex2')).toHaveStyle({ alignItems: 'flex-start' });
      expect(screen.getByTestId('flex3')).toHaveStyle({ alignItems: 'flex-end' });
      expect(screen.getByTestId('flex4')).toHaveStyle({ alignItems: 'stretch' });
      expect(screen.getByTestId('flex5')).toHaveStyle({ alignItems: 'baseline' });
    });

    it('should justify items properly', () => {
      renderWithTheme(<FlexLayout data-testid="flex1" justifyContent="center" />);
      renderWithTheme(<FlexLayout data-testid="flex2" justifyContent="flex-start" />);
      renderWithTheme(<FlexLayout data-testid="flex3" justifyContent="flex-end" />);
      renderWithTheme(<FlexLayout data-testid="flex4" justifyContent="space-between" />);
      renderWithTheme(<FlexLayout data-testid="flex5" justifyContent="space-around" />);
      renderWithTheme(<FlexLayout data-testid="flex6" justifyContent="space-evenly" />);

      expect(screen.getByTestId('flex1')).toHaveStyle({ justifyContent: 'center' });
      expect(screen.getByTestId('flex2')).toHaveStyle({ justifyContent: 'flex-start' });
      expect(screen.getByTestId('flex3')).toHaveStyle({ justifyContent: 'flex-end' });
      expect(screen.getByTestId('flex4')).toHaveStyle({ justifyContent: 'space-between' });
      expect(screen.getByTestId('flex5')).toHaveStyle({ justifyContent: 'space-around' });
      expect(screen.getByTestId('flex6')).toHaveStyle({ justifyContent: 'space-evenly' });
    });

    it('should wrap items properly', () => {
      renderWithTheme(<FlexLayout data-testid="flex1" flexWrap="wrap" />);
      renderWithTheme(<FlexLayout data-testid="flex2" flexWrap="wrap-reverse" />);
      renderWithTheme(<FlexLayout data-testid="flex3" flexWrap="nowrap" />);

      expect(screen.getByTestId('flex1')).toHaveStyle({ flexWrap: 'wrap' });
      expect(screen.getByTestId('flex2')).toHaveStyle({ flexWrap: 'wrap-reverse' });
      expect(screen.getByTestId('flex3')).toHaveStyle({ flexWrap: 'nowrap' });
    });

    it('should apply proper grow and shrink', () => {
      renderWithTheme(<FlexLayout data-testid="flex1" flexGrow={2} flexShrink={1} />);
      renderWithTheme(<FlexLayout data-testid="flex2" flexGrow={1} flexShrink={0} />);

      expect(screen.getByTestId('flex1')).toHaveStyle({ flexGrow: '2', flexShrink: 1 });
      expect(screen.getByTestId('flex2')).toHaveStyle({ flexGrow: '1', flexShrink: 0 });
    });
  });

  describe('child items', () => {
    it('should render child items', () => {
      renderWithTheme(
        <FlexLayout data-testid="flex">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </FlexLayout>,
      );

      const flexElement = screen.getByTestId('flex');

      expect(within(flexElement).getByText('Item 1')).toBeInTheDocument();
      expect(within(flexElement).getByText('Item 2')).toBeInTheDocument();
      expect(within(flexElement).getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('spacing', () => {
    it('should apply the gap property', () => {
      renderWithTheme(
        <FlexLayout data-testid="flex" space={4}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </FlexLayout>,
      );

      const flexElement = screen.getByTestId('flex');

      expect(flexElement).toHaveStyle({ gap: '16px' });
    });
  });
});
