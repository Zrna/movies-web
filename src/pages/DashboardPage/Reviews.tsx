import { CenteredLoadingSpinner } from '~/components';
import { useReviews } from '~/hooks';
import { FlexLayout, Text } from '~/ui';

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
    <FlexLayout flexDirection="row" space={5}>
      {reviews.data.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </FlexLayout>
  );
};
