import { useState } from 'react';
import { Redirect, useParams } from 'react-router';

import { UpdateReview } from '~/api';
import { BackToLink, Base64Img, CenteredLoadingSpinner, TextWithIcon } from '~/components';
import { useDeleteReview, useReviewById, useUpdateReview } from '~/hooks';
import { Box, FlexLayout, Text, useModal } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';
import { formatDate } from '~/utils';

import { Content } from './Content';
import { EditContentForm } from './EditContentForm';

interface UseParamsData {
  reviewId: string;
}

export const ReviewPage = () => {
  const { reviewId }: UseParamsData = useParams();
  const { data: review, isLoading } = useReviewById(reviewId);
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();
  const [modal, showModal] = useModal({
    title: 'Delete review',
    content: 'Are you sure you want to delete this review?',
    actionButton: {
      text: 'Delete review',
      action: async () => deleteReview(reviewId),
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (!review) {
    return <Redirect to="/dashboard" />;
  }

  const { img, name, updatedAt, watchAgain } = review;

  const handleEditReview = (data: UpdateReview) => {
    updateReview({ id: reviewId, data });
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
          <Text color="white-alpha-75" variant="text-s-medium" onClick={showModal}>
            Delete
          </Text>
        </FlexLayout>
        <Text color="white-alpha-50" variant="text-s-medium">
          <i>Last updated on {formatDate(updatedAt)}</i>
        </Text>
      </FlexLayout>
      <FlexLayout flexDirection={['column', 'row']} space={5}>
        <FlexLayout flexDirection="column" sx={{ width: ['100%', '350px'] }}>
          <Base64Img alt={`${name} poster`} placeHolder={defaultPoster} src={img} />
        </FlexLayout>
        <Box sx={{ width: ['100%', '400px', '800px'] }}>
          {isEditMode ? <EditContentForm data={review} onSubmit={handleEditReview} /> : <Content data={review} />}
        </Box>
      </FlexLayout>
      {modal}
    </FlexLayout>
  );
};
