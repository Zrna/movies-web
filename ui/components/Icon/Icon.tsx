import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { Box, BoxProps, theme } from '~/ui';
import * as icons from '~/ui/assets/icons';

const sizesMap = {
  s: '8px',
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

export const Icon = forwardRef<any, IconProps>(
  // TODO: Remove unused-vars eslint rule and fix the ref issue
  // eslint-disable-next-line unused-imports/no-unused-vars
  ({ bg, color, icon, isRounded = false, size = 'm', onClick, sx, ...rest }, ref) => {
    const IconComponent = icons[icon] as SvgrComponent;

    if (icons[icon] === undefined) {
      return null;
    }

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
            <IconComponent height="100%" preserveAspectRatio="xMidYMin slice" width="100%" />
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
        <IconComponent height="100%" preserveAspectRatio="xMidYMin slice" width="100%" />
      </Box>
    );
  },
);

export const iconSizesMap = sizesMap;
