import { GetReviews } from '~/api';
import { Box, Text, useScreenType } from '~/ui';

import { ReviewCard } from './ReviewCard';

interface ReviewsProps {
  data: GetReviews | undefined;
}

export const Reviews: React.FC<ReviewsProps> = ({ data: reviews }) => {
  const { isMobile, isTablet } = useScreenType();

  if (!reviews || reviews.totalRecords === 0 || reviews.data.length === 0) {
    return (
      <Text color="primary" variant="text-xl-bold">
        No reviews.
      </Text>
    );
  }

  const gridColumnsStyle = (): string => {
    const numberOfCards = isMobile ? 1 : isTablet ? 2 : 4;

    return `repeat(${numberOfCards}, 1fr)`;
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: gridColumnsStyle(),
        gap: '24px',
      }}
    >
      {reviews.data.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </Box>
  );
};
