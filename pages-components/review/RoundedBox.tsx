import React from 'react';

import { FlexLayout, Text, theme } from '~/ui';

interface RoundedBoxProps {
  title: string;
  info: string;
  element: React.ReactNode;
}

export const RoundedBox: React.FC<RoundedBoxProps> = ({ title, info, element }) => {
  return (
    <FlexLayout
      flexDirection="column"
      p={[4, 4, 5]}
      space={[3, 5]}
      sx={{
        width: ['100%', 'fit-content', '424px'],
        minWidth: ['auto', '200px', 'auto'],
        border: `2px solid ${theme.colors['light-dark']}`,
        borderRadius: '30px',
      }}
    >
      <Text variant="headline-h5">{title}</Text>
      <FlexLayout alignItems="center" space={4}>
        {element}
        <Text>{info}</Text>
      </FlexLayout>
    </FlexLayout>
  );
};
