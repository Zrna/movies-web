import { BoxProps, ThemeUIStyleObject } from 'theme-ui';

import { Box, Icon, theme } from '~/ui';

const sizesMap = {
  s: '8px',
  m: '16px',
  l: '24px',
  xl: '36px',
  xxl: '48px',
};

export interface LoadingSpinnerProps extends BoxProps {
  color?: theme.Color;
  size?: keyof typeof sizesMap;
  sx?: ThemeUIStyleObject;
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
      <Icon icon="loadingSpinner" size={size} />
    </Box>
  );
}

export const loadingSpinnerSizesMap = sizesMap;
