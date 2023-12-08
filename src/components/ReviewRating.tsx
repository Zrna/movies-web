import { FlexLayout, Text } from '~/ui';

import { Indicator } from './Indicator';

const getReviewRatingIndicatorColor = (rating: number | null) => {
  if (!rating) {
    return 'dimmed';
  }

  if (rating <= 2) {
    return 'red';
  }

  if (rating === 3) {
    return 'orange';
  }

  return 'green';
};

export const ReviewRating = ({ rating }: { rating: number | null }) => {
  return (
    <FlexLayout
      alignItems="center"
      bg="white-alpha-25"
      px={3}
      py={2}
      space={2}
      sx={{ width: '100px', borderRadius: '50px', backdropFilter: 'blur(5px)' }}
    >
      <Indicator color={getReviewRatingIndicatorColor(rating)} />
      <Text color="white" variant="headline-h6">
        {rating?.toFixed(1) ?? 'Not'} Rated
      </Text>
    </FlexLayout>
  );
};
