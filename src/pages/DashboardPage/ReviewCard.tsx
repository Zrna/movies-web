import { Review } from '~/api';
import { Divider, FlexLayout, Text, theme } from '~/ui';

interface ReviewProps {
  data: Review;
}

export const ReviewCard: React.FC<ReviewProps> = ({ data }) => {
  const { name, id, review } = data;

  return (
    <FlexLayout
      flexDirection="column"
      key={id}
      p={4}
      space={4}
      sx={{
        width: '300px',
        border: `1px solid ${theme.colors['gray-600']}`,
        borderRadius: 'm',
      }}
    >
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-l-bold">
          Name
        </Text>
        <Text color="primary" variant="text-l-bold">
          {name}
        </Text>
      </FlexLayout>
      <Divider color="gray-600" />
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-l-bold">
          Review
        </Text>
        <Text color="primary" variant="text-l-bold">
          {review}
        </Text>
      </FlexLayout>
    </FlexLayout>
  );
};
