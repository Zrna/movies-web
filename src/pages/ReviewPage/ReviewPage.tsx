import { Redirect, useParams } from 'react-router';

import { BackToLink, CenteredLoadingSpinner } from '~/components';
import { useReviewById } from '~/hooks';
import { FlexLayout, Text } from '~/ui';

import { Content } from './Content';
import { Image } from './Image';

interface UseParamsData {
  reviewId: string;
}

export const ReviewPage = () => {
  const { reviewId }: UseParamsData = useParams();
  const { review, isLoading } = useReviewById(reviewId);

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (!review) {
    // it will show toast with corresponding message
    return <Redirect to="/dashboard" />;
  }

  const { name } = review;

  return (
    <FlexLayout flexDirection="column" p={4} space={5}>
      <BackToLink text="back to dashboard" to="/dashboard" />
      <Text variant="display-heading-m">{name}</Text>
      <FlexLayout flexDirection={['column', 'row']} space={5}>
        <Image />
        <Content data={review} />
      </FlexLayout>
    </FlexLayout>
  );
};
