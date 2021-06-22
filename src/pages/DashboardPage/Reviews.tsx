import { CenteredLoadingSpinner } from '~/components';
import { useReviews } from '~/hooks';
import { Box, Text } from '~/ui';

import { ReviewCard } from './ReviewCard';

export const Reviews = () => {
  const { reviews, isLoading } = useReviews();

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (!reviews || reviews.totalRecords === 0) {
    return (
      <Text color="primary" variant="text-xl-bold">
        No reviews.
      </Text>
    );
  }

  return (
    <Box
      style={{
        display: 'grid',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
        alignItems: 'start',
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 18rem))',
        gridGap: '24px',
      }}
    >
      {reviews.data.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </Box>
  );
};
