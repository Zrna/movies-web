import { useState } from 'react';

import { Review, UpdateReview } from '~/api';
import { RatingStars } from '~/components';
import { Button, Checkbox, FlexLayout, Text, Textarea, TextInput, useScreenType } from '~/ui';
import { splitStringToNewLine } from '~/utils';

interface ContentProps {
  data: Review;
  isEditMode: boolean;
  onEdit: (data: UpdateReview) => void;
}

export const Content: React.FC<ContentProps> = ({ data, isEditMode, onEdit }) => {
  const { isMobile } = useScreenType();
  const { rating, review, url, watchAgain } = data;
  const [updatedReview, setUpdatedReview] = useState<string>(review);
  const [updatedRating, setUpdatedRating] = useState<number | null>(rating);
  const [updatedUrl, setUpdatedUrl] = useState<string | null>(url);
  const [updatedWatchAgain, setUpdatedWatchAgain] = useState<boolean>(watchAgain);

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
          URL
        </Text>
        {isEditMode ? (
          <TextInput value={updatedUrl ?? ''} onChange={(value) => setUpdatedUrl(value)} />
        ) : (
          <Text color="primary" variant="text-l-medium">
            {updatedUrl ? (
              <a href={updatedUrl} rel="noreferrer" target="_blank">
                {updatedUrl}
              </a>
            ) : (
              'N/A'
            )}
          </Text>
        )}
      </FlexLayout>
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Would watch again or recommend?
        </Text>
        {isEditMode ? (
          <Checkbox value={updatedWatchAgain} onChange={() => setUpdatedWatchAgain(!updatedWatchAgain)} />
        ) : (
          <Text color="primary" variant="text-l-medium">
            {watchAgain ? 'Yes' : 'No'}
          </Text>
        )}
      </FlexLayout>
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Review
        </Text>
        <Text color="primary" variant="text-l-medium">
          {isEditMode ? (
            <Textarea value={updatedReview} onChange={(value) => setUpdatedReview(value)} />
          ) : (
            splitStringToNewLine(review)
          )}
        </Text>
      </FlexLayout>
      {isEditMode && (
        <Button
          isDisabled={
            !updatedReview ||
            (updatedReview === review &&
              updatedRating === rating &&
              updatedUrl === url &&
              updatedWatchAgain === watchAgain)
          }
          isFullWidth={isMobile}
          text="Edit review"
          onClick={() =>
            onEdit({
              rating: updatedRating,
              review: updatedReview,
              url: updatedUrl,
              watchAgain: updatedWatchAgain,
            })
          }
        />
      )}
    </FlexLayout>
  );
};
