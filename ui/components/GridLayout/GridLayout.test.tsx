import { screen, within } from '@testing-library/react';

import { mockWindowMatchMedia, renderWithTheme } from '~/utils/tests';

import { GridLayout } from './GridLayout';

describe('GridLayout', () => {
  beforeAll(mockWindowMatchMedia);

  it('should render', () => {
    renderWithTheme(
      <GridLayout alignItems="center" data-testid="grid" gap={4} gridTemplateColumns="1fr">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </GridLayout>,
    );

    expect(screen.getByTestId('grid')).toMatchSnapshot();
  });

  it('should render grid component', () => {
    renderWithTheme(<GridLayout data-testid="grid" />);

    expect(screen.getByTestId('grid')).toHaveStyle({ display: 'grid' });
  });

  describe('grid container', () => {
    it('should apply proper columns', () => {
      renderWithTheme(<GridLayout data-testid="grid1" gridTemplateColumns="none" />);
      renderWithTheme(<GridLayout data-testid="grid2" gridTemplateColumns="1fr" />);
      renderWithTheme(<GridLayout data-testid="grid3" gridTemplateColumns="100px 1fr" />);
      renderWithTheme(<GridLayout data-testid="grid4" gridTemplateColumns="repeat(3, 200px)" />);

      expect(screen.getByTestId('grid1')).toHaveStyle({ gridTemplateColumns: 'none' });
      expect(screen.getByTestId('grid2')).toHaveStyle({ gridTemplateColumns: '1fr' });
      expect(screen.getByTestId('grid3')).toHaveStyle({ gridTemplateColumns: '100px 1fr' });
      expect(screen.getByTestId('grid4')).toHaveStyle({ gridTemplateColumns: 'repeat(3, 200px)' });
    });

    it('should align items properly', () => {
      renderWithTheme(<GridLayout alignItems="center" data-testid="grid1" />);
      renderWithTheme(<GridLayout alignItems="start" data-testid="grid2" />);
      renderWithTheme(<GridLayout alignItems="end" data-testid="grid3" />);
      renderWithTheme(<GridLayout alignItems="stretch" data-testid="grid4" />);
      renderWithTheme(<GridLayout alignItems="baseline" data-testid="grid5" />);

      expect(screen.getByTestId('grid1')).toHaveStyle({ alignItems: 'center' });
      expect(screen.getByTestId('grid2')).toHaveStyle({ alignItems: 'start' });
      expect(screen.getByTestId('grid3')).toHaveStyle({ alignItems: 'end' });
      expect(screen.getByTestId('grid4')).toHaveStyle({ alignItems: 'stretch' });
      expect(screen.getByTestId('grid5')).toHaveStyle({ alignItems: 'baseline' });
    });

    it('should justify items properly', () => {
      renderWithTheme(<GridLayout data-testid="grid1" justifyItems="center" />);
      renderWithTheme(<GridLayout data-testid="grid2" justifyItems="start" />);
      renderWithTheme(<GridLayout data-testid="grid3" justifyItems="end" />);

      expect(screen.getByTestId('grid1')).toHaveStyle({ justifyItems: 'center' });
      expect(screen.getByTestId('grid2')).toHaveStyle({ justifyItems: 'start' });
      expect(screen.getByTestId('grid3')).toHaveStyle({ justifyItems: 'end' });
    });
  });

  describe('child items', () => {
    it('should render child items', () => {
      renderWithTheme(
        <GridLayout data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </GridLayout>,
      );

      const gridElement = screen.getByTestId('grid');

      expect(within(gridElement).getByText('Item 1')).toBeInTheDocument();
      expect(within(gridElement).getByText('Item 2')).toBeInTheDocument();
      expect(within(gridElement).getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('spacing', () => {
    it('should apply the gap property', () => {
      renderWithTheme(
        <GridLayout data-testid="grid" gap={4}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </GridLayout>,
      );

      const gridElement = screen.getByTestId('grid');

      expect(gridElement).toHaveStyle({ gap: '16px' });
    });
  });
});
