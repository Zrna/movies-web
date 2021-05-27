import SVG from 'react-inlinesvg';
import { BoxProps, SxStyleProp } from 'theme-ui';

import { Box, theme } from '~/ui';

import loadingIcon from './loading-spinner.svg';

const sizesMap = {
  m: '24px',
  l: '32px',
  xl: '40px',
};

export interface LoadingSpinnerProps extends BoxProps {
  color?: theme.Color;
  size?: keyof typeof sizesMap;
  sx?: SxStyleProp;
}

export function LoadingSpinner({ color = 'white', size = 'm' }: LoadingSpinnerProps) {
  return (
    <Box
      color={color}
      sx={{
        color,
        height: sizesMap[size],
        width: sizesMap[size],
      }}
    >
      <SVG src={loadingIcon} />
    </Box>
  );
}

export const loadingSpinnerSizesMap = sizesMap;
