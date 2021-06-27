import { Link } from 'react-router-dom';

import { Review } from '~/api';
import { RatingStars } from '~/components';
import { Divider, FlexLayout, Icon, Text, theme } from '~/ui';

interface ReviewProps {
  data: Review;
}

export const ReviewCard: React.FC<ReviewProps> = ({ data }) => {
  const { name, id, rating, watchAgain } = data;

  return (
    <FlexLayout
      flexDirection="column"
      key={id}
      p={4}
      space={4}
      sx={{
        border: `1px solid ${theme.colors['gray-600']}`,
        borderRadius: 'm',
      }}
    >
      <FlexLayout alignItems="flex-start" flexDirection="row" justifyContent="space-between" space={2}>
        <Link style={{ width: '100%' }} to={`/review/${id}`}>
          <FlexLayout flexDirection="column" space={2}>
            <Text color="white-alpha-50" variant="text-l-bold">
              Name
            </Text>
            <Text color="primary" variant="text-l-bold">
              {name}
            </Text>
          </FlexLayout>
        </Link>
        {watchAgain && <Icon color="green" icon="checkBadge" size="l" title="I would watch again or recommend." />}
      </FlexLayout>
      <Divider color="gray-600" />
      <FlexLayout flexDirection="column" space={2}>
        <Text color="white-alpha-50" variant="text-l-bold">
          Rating
        </Text>
        <RatingStars isReadOnly rating={rating} />
      </FlexLayout>
    </FlexLayout>
  );
};
