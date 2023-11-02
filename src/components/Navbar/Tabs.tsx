import React from 'react';

import { useSelectedTabFilter } from '~/context';
import { FlexLayout, Text, theme, useScreenType } from '~/ui';

interface TabsProps {
  theme?: 'dark' | 'light';
  tabs: string[];
}

export const Tabs: React.FC<TabsProps> = ({ theme: tabsTheme = 'dark', tabs }) => {
  const { selectedTabFilter, setSelectedTabFilter } = useSelectedTabFilter();
  const { isMobile } = useScreenType();

  const isDarkTheme = tabsTheme === 'dark';

  return (
    <FlexLayout
      bg={isDarkTheme ? 'black' : 'dark'}
      p={1}
      space={3}
      sx={{ border: `1px solid ${theme.colors['light-dark']}`, borderRadius: '50px' }}
    >
      {tabs.map((tab) => {
        const isActive = selectedTabFilter === tab.toLowerCase();

        // TODO: add some animation onChange
        return (
          <Text
            bg={isActive ? 'white' : 'transparent'}
            color={isActive ? 'black' : 'dimmed'}
            key={`tab-${tab}`}
            px={[4, 4, 5]}
            py={2}
            sx={{ borderRadius: '100px', transition: isActive ? 'color 0.2s ease-in' : 'none' }}
            variant={isMobile ? 'paragraph-small' : 'paragraph-default'}
            onClick={() => setSelectedTabFilter(tab.toLowerCase())}
          >
            {tab}
          </Text>
        );
      })}
    </FlexLayout>
  );
};
