import { Property } from 'csstype';
import { Box, BoxProps } from 'theme-ui';

export interface GridLayoutProps extends BoxProps {
  alignItems?: Property.AlignItems | Property.AlignItems[];
  columnGap?: number | number[];
  gap?: number | number[];
  gridTemplateColumns?: Property.GridTemplateColumns | Property.GridTemplateColumns[];
  gridTemplateRows?: Property.GridTemplateRows | Property.GridTemplateRows[];
  justifyItems?: Property.JustifyItems | Property.JustifyItems[];
  rowGap?: number | number[];
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  alignItems,
  columnGap,
  gap,
  gridTemplateColumns,
  gridTemplateRows,
  justifyItems,
  rowGap,
  sx = {},
  ...rest
}) => {
  return (
    <Box
      sx={{
        ...sx,
        alignItems,
        columnGap,
        display: 'grid',
        gap,
        gridTemplateColumns,
        gridTemplateRows,
        justifyItems,
        rowGap,
      }}
      {...rest}
    />
  );
};
