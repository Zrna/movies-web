import { useState } from 'react';
import { Redirect, useParams } from 'react-router';

import { UpdateReview } from '~/api';
import { BackToLink, CenteredLoadingSpinner, TextWithIcon } from '~/components';
import { useReviewById } from '~/hooks';
import { FlexLayout, Text } from '~/ui';
import { formatDate } from '~/utils';

import { Content } from './Content';
import { Image } from './Image';

interface UseParamsData {
  reviewId: string;
}

export const ReviewPage = () => {
  const { reviewId }: UseParamsData = useParams();
  const { review, isLoading, deleteReviewById, updateReviewById } = useReviewById(reviewId);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (!review) {
    return <Redirect to="/dashboard" />;
  }

  const { name, updatedAt, watchAgain } = review;

  const handleEditReview = async (data: UpdateReview) => {
    await updateReviewById(reviewId, data);
    setIsEditMode(false);
  };

  return (
    <FlexLayout flexDirection="column" p={4} space={5}>
      <BackToLink text="back to dashboard" to="/dashboard" />
      <FlexLayout flexDirection="column" space={3}>
        <TextWithIcon
          iconColor="green"
          iconRight={watchAgain ? 'checkBadge' : undefined}
          iconSize="l"
          iconTitle="I would watch again or recommend"
          text={name}
          variant="display-heading-m"
        />
        <FlexLayout flexDirection="row" space={4}>
          <Text
            color={isEditMode ? 'primary' : 'white-alpha-75'}
            variant="text-s-medium"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Discard changes' : 'Edit'}
          </Text>
          <Text variant="text-s-medium">|</Text>
          <Text color="white-alpha-75" variant="text-s-medium" onClick={() => deleteReviewById(reviewId)}>
            Delete
          </Text>
        </FlexLayout>
        <Text color="white-alpha-50" variant="text-s-medium">
          <i>Last updated on {formatDate(updatedAt)}</i>
        </Text>
      </FlexLayout>
      <FlexLayout flexDirection={['column', 'row']} space={5}>
        <Image />
        <Content data={review} isEditMode={isEditMode} onEdit={handleEditReview} />
      </FlexLayout>
    </FlexLayout>
  );
};
