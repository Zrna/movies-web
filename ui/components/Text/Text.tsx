import { forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { theme } from '../../index';
import { Box, BoxProps } from '../Box';

export interface TextProps extends BoxProps {
  as?: React.ElementType;
  variant?: theme.TextVariant;
  sx?: ThemeUIStyleObject;
}

export const Text = forwardRef<any, TextProps>(({ as = 'span', variant = 'paragraph-default', sx, ...rest }, ref) => {
  const { color = 'white' } = rest;

  return (
    <Box
      as={as}
      ref={ref}
      sx={{
        variant: `text.${variant}`,
        color,
        ...sx,
      }}
      {...rest}
    />
  );
});
