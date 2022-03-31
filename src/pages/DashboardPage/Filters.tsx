import { TextWithIcon } from '~/components';
import { FlexLayout, Text, theme } from '~/ui';
import { pluralize } from '~/utils';

interface FiltersProps {
  activeLength: number;
  showOnlyWatchAgain: boolean;
  totalLength: number;
  onShowWatchAgain(): void;
}

export const Filters: React.FC<FiltersProps> = ({
  activeLength,
  showOnlyWatchAgain,
  totalLength,
  onShowWatchAgain,
}) => {
  if (totalLength < 1) {
    return null;
  }

  return (
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
        onClick={onShowWatchAgain}
      />
      <Text color="white-alpha-50" variant="text-s-medium">
        Showing {activeLength} of {totalLength} {pluralize('review', totalLength)}.
      </Text>
    </FlexLayout>
  );
};
