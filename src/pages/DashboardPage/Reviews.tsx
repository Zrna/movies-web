import { GetReviews } from '~/api';
import { Box, Text, useScreenType } from '~/ui';

import { ReviewCard } from './ReviewCard';

export const Reviews = ({ data: reviews }: { data: GetReviews | undefined }) => {
  const { isMobile, isTablet } = useScreenType();

  if (!reviews || reviews.totalRecords === 0 || reviews.data.length === 0) {
    return (
      <Text color="primary" variant="text-xl-bold">
        No reviews.
      </Text>
    );
  }

  const gridColumnsStyle = () => {
    let numberOfCards = 7;

    if (isMobile) {
      numberOfCards = 2;
    }

    if (isTablet) {
      numberOfCards = 4;
    }

    return `repeat(${numberOfCards}, 1fr)`;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: gridColumnsStyle(),
        gap: isMobile ? '40px' : '24px',
      }}
    >
      {reviews.data.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </Box>
  );
};
