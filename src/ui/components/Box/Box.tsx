import { forwardRef, useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import { Box as ThemeBox, BoxProps as ThemeBoxProps, SxStyleProp } from 'theme-ui';

import { styles, theme } from '~/ui';

export interface BoxProps extends ThemeBoxProps {
  color?: theme.Color;
  isDisabled?: boolean;
  type?: string;
  value?: any;
  target?: string;
  sx?: SxStyleProp;
  onClick?: (event?: any) => void;
  onOutsideClick?(event: Event): void;
}

export const Box: React.FC<BoxProps> = forwardRef<any, any>(
  ({ isDisabled = false, sx, onClick, onOutsideClick, ...rest }, ref: any) => {
    const clickableStyle = isDisabled || onClick ? styles.interactions.clickable : {};

    const innerRef = useRef(ref);

    useClickAway(innerRef, () => {
      if (onOutsideClick) {
        onOutsideClick();
      }
    });

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
