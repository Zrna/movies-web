import { Property } from 'csstype';
import { forwardRef } from 'react';

import { Box, BoxProps } from '~/ui';

export interface FlexLayoutProps extends BoxProps {
  alignItems?: Property.AlignItems | Property.AlignItems[];
  flexDirection?: Property.FlexDirection | Property.FlexDirection[];
  flexGrow?: Property.FlexGrow | Property.FlexGrow[];
  flexShrink?: Property.FlexShrink | Property.FlexShrink[];
  flexWrap?: Property.FlexWrap | Property.FlexWrap[];
  justifyContent?: Property.JustifyContent | Property.JustifyContent[];
  space?: number | number[];
}

export const FlexLayout = forwardRef<any, FlexLayoutProps>(
  (
    { alignItems, flexDirection = 'row', flexGrow, flexShrink, flexWrap, justifyContent, space = 0, sx = {}, ...rest },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          ...sx,
          alignItems,
          display: 'flex',
          flexDirection,
          flexGrow,
          flexShrink,
          flexWrap,
          justifyContent,
          gap: space,
          '> :not(:last-child)': '', //TODO: allButLast,
        }}
        {...rest}
      />
    );
  },
);
