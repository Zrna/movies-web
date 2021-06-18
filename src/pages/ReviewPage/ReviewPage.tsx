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

  const { name, updatedAt } = review;

  return (
    <FlexLayout flexDirection="column" p={4} space={5}>
      <BackToLink text="back to dashboard" to="/dashboard" />
      <FlexLayout flexDirection="column" space={3}>
        <Text variant="display-heading-m">{name}</Text>
        <FlexLayout flexDirection="row" space={4}>
          <Text color="white-alpha-75" variant="text-s-medium" onClick={() => undefined}>
            Edit
          </Text>
          <Text variant="text-s-medium">|</Text>
          <Text
            color="white-alpha-75"
            variant="text-s-medium"
            onClick={() => window.confirm('Are you sure you want to delete this review?')}
          >
            Delete
          </Text>
        </FlexLayout>
        <Text color="white-alpha-50" variant="text-s-medium">
          <i>Last updated on {updatedAt.slice(0, 10)}</i>
        </Text>
      </FlexLayout>
      <FlexLayout flexDirection={['column', 'row']} space={5}>
        <Image />
        <Content data={review} />
      </FlexLayout>
    </FlexLayout>
  );
};
