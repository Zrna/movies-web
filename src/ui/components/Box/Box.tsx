import { forwardRef, useRef } from 'react';
import { Box as ThemeBox, BoxProps as ThemeBoxProps, SxStyleProp } from 'theme-ui';

import { styles, theme } from '~/ui';

export interface BoxProps extends ThemeBoxProps {
  color?: theme.Color;
  isDisabled?: boolean;
  type?: string;
  value?: any;
  onClick?: (event?: any) => void;
  target?: string;
  sx?: SxStyleProp;
}

export const Box: React.FC<BoxProps> = forwardRef<any, any>(
  ({ isDisabled = false, sx, onClick, ...rest }, ref: any) => {
    const innerRef = useRef(ref);

    const clickableStyle = isDisabled || onClick ? styles.interactions.clickable : {};

    return (
      <ThemeBox
        ref={innerRef}
        sx={{ ...clickableStyle, ...sx }}
        onClick={!isDisabled && onClick ? onClick : undefined}
        {...{ disabled: isDisabled, ...rest }}
      />
    );
  },
);
