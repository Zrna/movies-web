import { useState } from 'react';

import { Review, UpdateReview } from '~/api';
import { RatingStars } from '~/components';
import { Button, FlexLayout, Text, Textarea, useScreenType } from '~/ui';

interface ContentProps {
  data: Review;
  isEditMode: boolean;
  onEdit: ({ rating, review }: UpdateReview) => void;
}

export const Content: React.FC<ContentProps> = ({ data, isEditMode, onEdit }) => {
  const { isMobile } = useScreenType();
  const { rating, review } = data;
  const [updatedReview, setUpdatedReview] = useState<string>(review);
  const [updatedRating, setUpdatedRating] = useState<number | null>(rating);

  return (
    <FlexLayout flexDirection="column" space={4} sx={{ width: ['100%', '400px', '800px'] }}>
      {isEditMode && (
        <Text color="white" variant="text-m">
          * Only{' '}
          <Text color="white" variant="text-m-medium">
            rating
          </Text>{' '}
          and{' '}
          <Text color="white" variant="text-m-medium">
            review
          </Text>{' '}
          fields are editable
        </Text>
      )}
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Rating
        </Text>
        <RatingStars isReadOnly={!isEditMode} rating={updatedRating} onChange={(value) => setUpdatedRating(value)} />
      </FlexLayout>
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Review
        </Text>
        <Text color="primary" variant="text-l-medium">
          {isEditMode ? (
            <Textarea value={updatedReview} onChange={(value) => setUpdatedReview(value.trimStart())} />
          ) : (
            review
          )}
        </Text>
      </FlexLayout>
      {isEditMode && (
        <Button
          isDisabled={!updatedReview || (updatedReview === review && updatedRating === rating)}
          isFullWidth={isMobile}
          text="Edit review"
          onClick={() => onEdit({ rating: updatedRating, review: updatedReview })}
        />
      )}
    </FlexLayout>
  );
};
