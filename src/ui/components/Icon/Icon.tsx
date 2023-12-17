import SVG from 'react-inlinesvg';
import { ThemeUIStyleObject } from 'theme-ui';

import { Box, BoxProps, theme } from '~/ui';
import * as icons from '~/ui/assets/icons';

const sizesMap = {
  m: '16px',
  l: '24px',
  xl: '36px',
  xxl: '48px',
};

export interface IconProps extends BoxProps {
  color?: theme.Color;
  icon: theme.Icon;
  size?: keyof typeof sizesMap;
  sx?: ThemeUIStyleObject;
}

export const Icon: React.FC<IconProps> = ({ color, icon, size = 'm', onClick, sx, ...rest }) => {
  const iconSrc = icons[icon];

  return (
    <Box
      sx={{
        ...sx,
        color,
        flex: 'none',
        height: sizesMap[size],
        width: sizesMap[size],
      }}
      onClick={onClick}
      {...rest}
    >
      <SVG height="100%" src={iconSrc} viewBox="0 0 24 24" width="100%" />
    </Box>
  );
};

export const iconSizesMap = sizesMap;
