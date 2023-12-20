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
  bg?: theme.Color;
  color?: theme.Color;
  icon: theme.Icon;
  isRounded?: boolean;
  size?: keyof typeof sizesMap;
  sx?: ThemeUIStyleObject;
}

export const Icon: React.FC<IconProps> = ({ bg, color, icon, isRounded = false, size = 'm', onClick, sx, ...rest }) => {
  const iconSrc = icons[icon];

  if (isRounded && bg) {
    return (
      <Box bg={bg} p={3} sx={{ backdropFilter: 'blur(5px)', borderRadius: '50%' }}>
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
          <SVG height="100%" src={iconSrc} width="100%" />
        </Box>
      </Box>
    );
  }

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
      <SVG height="100%" src={iconSrc} width="100%" />
    </Box>
  );
};

export const iconSizesMap = sizesMap;
