import { Dispatch, SetStateAction } from 'react';

import { TextWithIcon } from '~/components';
import { FlexLayout, Text, TextInput, theme } from '~/ui';
import { pluralize } from '~/utils';

interface SearchAndFiltersProps {
  activeLength: number;
  isShowOnlyWatchAgain: boolean;
  searchValue: string;
  totalLength: number;
  onSearch: Dispatch<SetStateAction<string>>;
  onShowWatchAgain(): void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  activeLength,
  isShowOnlyWatchAgain,
  searchValue,
  totalLength,
  onSearch,
  onShowWatchAgain,
}) => {
  if (totalLength < 1) {
    return null;
  }

  return (
    <FlexLayout flexDirection="column" space={5}>
      <TextInput placeholder="Search review..." value={searchValue} onChange={onSearch} />
      <TextWithIcon
        color={isShowOnlyWatchAgain ? 'green' : 'gray-500'}
        iconLeft="eye"
        sx={{
          border: `1px solid ${theme.colors[isShowOnlyWatchAgain ? 'green' : 'gray-500']}`,
          padding: 2,
          width: 'fit-content',
        }}
        text="Show only watch again"
        onClick={onShowWatchAgain}
      />
      <Text color="white-alpha-50" variant="text-s-medium">
        Showing {activeLength} of {totalLength} {pluralize('review', totalLength)}.
      </Text>
    </FlexLayout>
  );
};
