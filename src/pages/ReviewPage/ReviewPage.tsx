import { useState } from 'react';
import { Redirect, useParams } from 'react-router';

import { UpdateReview } from '~/api';
import { BackToLink, Base64Img, CenteredLoadingSpinner, TextWithIcon } from '~/components';
import { useDeleteReview, useReviewById, useUpdateReview } from '~/hooks';
import { Box, FlexLayout, Text, useModal, useScreenType } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';
import { formatDate } from '~/utils';

import { Content } from './Content';
import { EditContentForm } from './EditContentForm';
import { Options } from './Options';

interface UseParamsData {
  reviewId: string;
}

export const ReviewPage = () => {
  const { reviewId }: UseParamsData = useParams();
  const { data: review, isLoading } = useReviewById(reviewId);
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();
  const [deleteModal, showDeleteModal] = useModal({
    title: 'Delete review',
    content: 'Are you sure you want to delete this review?',
    actionButton: {
      text: 'Delete review',
      action: async () => deleteReview(reviewId),
    },
  });
  const { isMobile, isTablet } = useScreenType();
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
    <FlexLayout flexDirection="row" space={5}>
      {!isMobile && (
        <Base64Img
          alt={`${name} poster`}
          placeHolder={defaultPoster}
          src={img}
          style={{ height: 'calc(100vh - 68px)', objectFit: 'cover', maxWidth: isTablet ? '320px' : '570px' }}
        />
      )}
      <FlexLayout flexDirection="column" p={4} space={4}>
        <FlexLayout flexDirection="column" space={6}>
          <BackToLink text="back to dashboard" to="/dashboard" />
          <FlexLayout alignItems="center" flexDirection="row" justifyContent="space-between" space={4}>
            <FlexLayout flexDirection="column" space={2}>
              <TextWithIcon
                iconColor="green"
                iconRight={watchAgain ? 'checkBadge' : undefined}
                iconSize="l"
                iconTitle="I would watch again or recommend"
                text={name}
                variant="display-heading-m"
              />
              <Text color="white-alpha-50" variant="text-s-medium">
                <i>Last updated on {formatDate(updatedAt)}</i>
              </Text>
            </FlexLayout>
            <Options isEditMode={isEditMode} onDelete={showDeleteModal} onEdit={setIsEditMode} />
          </FlexLayout>
        </FlexLayout>
        <FlexLayout flexDirection={['column', 'row']} space={5}>
          <Box sx={{ width: ['100%', '400px', '800px'] }}>
            {isEditMode ? (
              <EditContentForm data={review} onCancel={() => setIsEditMode(false)} onSubmit={handleEditReview} />
            ) : (
              <Content data={review} />
            )}
          </Box>
        </FlexLayout>
      </FlexLayout>
      {deleteModal}
    </FlexLayout>
  );
};
