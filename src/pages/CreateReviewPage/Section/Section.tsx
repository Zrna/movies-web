import { Property } from 'csstype';
import React from 'react';

import { FlexLayout } from '~/ui';

import { Title } from './Title';

interface SectionProps {
  children: React.ReactNode;
  title: string;
  number: string;
}

export const Section: React.FC<SectionProps> = (props) => {
  const { title, number, children } = props;
  const secondFlexDirection: Property.FlexDirection | Property.FlexDirection[] = number.includes('2')
    ? 'column'
    : ['column', 'row'];

  return (
    <FlexLayout alignItems="flex-start" flexDirection={['column', 'row']} justifyContent="space-between" space={5}>
      <Title number={number} title={title} />
      <FlexLayout flexDirection={secondFlexDirection} space={5} sx={{ width: ['100%', '65%', '50%'] }}>
        {children}
      </FlexLayout>
    </FlexLayout>
  );
};
