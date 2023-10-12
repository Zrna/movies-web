import { TextWithIcon } from '~/components';
import { Box, FlexLayout, Text, TextInput, theme } from '~/ui';
import { pluralize } from '~/utils';

interface FiltersProps {
  activeLength: number;
  showOnlyWatchAgain: boolean;
  totalLength: number;
  searchValue: string;
  onShowOnlyWatchAgain(): void;
  onSearch(value?: string): void;
}

export const Filters: React.FC<FiltersProps> = ({
  activeLength,
  showOnlyWatchAgain,
  totalLength,
  searchValue,
  onShowOnlyWatchAgain,
  onSearch,
}) => {
  if (totalLength < 1) {
    return null;
  }

  return (
    <FlexLayout data-testid="dashboard" flexDirection={['column', 'row']} justifyContent="space-between" space={4}>
      <FlexLayout flexDirection="column" space={5}>
        <TextWithIcon
          color={showOnlyWatchAgain ? 'green' : 'gray-500'}
          iconLeft="eye"
          sx={{
            border: `1px solid ${theme.colors[showOnlyWatchAgain ? 'green' : 'gray-500']}`,
            padding: 2,
            width: 'fit-content',
          }}
          text="Show only watch again"
          onClick={onShowOnlyWatchAgain}
        />
        <Text color="white-alpha-50" variant="paragraph-small">
          Showing {activeLength} of {totalLength} {pluralize('review', totalLength)}.
        </Text>
      </FlexLayout>
      <Box
        sx={{
          'div > div, div > div:hover, div > div:focus-within, div > div:active': {
            backgroundColor: 'transparent',
          },
          border: `1px solid ${theme.colors['gray-700']}`,
          height: '100%',
        }}
      >
        <TextInput
          iconLeft="search"
          iconRight={searchValue ? 'close' : undefined}
          placeholder="Search..."
          value={searchValue}
          onChange={onSearch}
          onClickRightIcon={onSearch}
        />
      </Box>
    </FlexLayout>
  );
};
