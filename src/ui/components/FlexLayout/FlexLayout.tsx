import { Property } from 'csstype';
import { forwardRef } from 'react';

import { Box, BoxProps, useResponsiveSelector } from '~/ui';

export interface FlexLayoutProps extends BoxProps {
  alignItems?: Property.AlignItems | Property.AlignItems[];
  flexDirection?: Property.FlexDirection | Property.FlexDirection[];
  flexGrow?: Property.FlexGrow | Property.FlexGrow[];
  flexShrink?: Property.FlexShrink | Property.FlexShrink[];
  flexWrap?: Property.FlexWrap | Property.FlexWrap[];
  justifyContent?: Property.JustifyContent | Property.JustifyContent[];
  space?: number | number[];
}

type PossiblyArray<T> = T | T[];

function mapArrayOrOne<T, V>(items: PossiblyArray<T>, f: (value: T) => V) {
  return Array.isArray(items) ? items.map(f) : f(items);
}

export const FlexLayout = forwardRef<any, FlexLayoutProps>(
  (
    { alignItems, flexDirection = 'row', flexGrow, flexShrink, flexWrap, justifyContent, space = 0, sx = {}, ...rest },
    ref,
  ) => {
    const r = useResponsiveSelector();

    const spaceValue = Array.isArray(space) ? r(...space) : space;

    const allButLast = {
      mb: mapArrayOrOne(flexDirection, (d) => (d === 'column' ? spaceValue : 0)),
      mr: mapArrayOrOne(flexDirection, (d) => (d === 'row' ? spaceValue : 0)),
    };

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
          '> :not(:last-child)': allButLast,
        }}
        {...rest}
      />
    );
  },
);
