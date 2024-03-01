import { forwardRef, useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import { Box as ThemeBox, BoxProps as ThemeBoxProps, ThemeUIStyleObject } from 'theme-ui';

import { styles, theme } from '~/ui';

export interface BoxProps extends ThemeBoxProps {
  color?: theme.Color;
  isDisabled?: boolean;
  type?: string;
  value?: any;
  target?: string;
  sx?: ThemeUIStyleObject;
  onClick?: (event?: any) => void;
  onOutsideClick?(event?: Event): void;
  'data-testid'?: string;
}

export const Box = forwardRef<any, BoxProps>(
  ({ isDisabled = false, sx, onClick, onOutsideClick, 'data-testid': dataTestId, ...rest }, ref: any) => {
    const clickableStyle = isDisabled || onClick ? styles.interactions.clickable : {};

    const innerRef = useRef(ref);
    if (onOutsideClick) {
      useClickAway(innerRef, onOutsideClick);
    }

    return (
      <ThemeBox
        data-testid={dataTestId}
        ref={onOutsideClick ? innerRef : ref}
        sx={{ ...clickableStyle, ...sx }}
        onClick={!isDisabled && onClick ? onClick : undefined}
        {...{ disabled: isDisabled, ...rest }}
      />
    );
  },
);
