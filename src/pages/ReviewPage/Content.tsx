import { Review } from '~/api';
import { RatingStars } from '~/components';
import { FlexLayout, Text } from '~/ui';

interface ContentProps {
  data: Review;
}

export const Content: React.FC<ContentProps> = ({ data }) => {
  const { rating, review } = data;

  return (
    <FlexLayout flexDirection="column" space={4}>
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Rating
        </Text>
        <RatingStars isReadOnly rating={rating} />
      </FlexLayout>
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-xl-bold">
          Review
        </Text>
        <Text color="primary" variant="text-l-medium">
          {review}
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
