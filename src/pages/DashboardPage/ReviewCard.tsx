import { Link } from 'react-router-dom';

import { Review } from '~/api';
import { RatingStars, TextWithIcon } from '~/components';
import { Divider, FlexLayout, Text, theme } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

interface ReviewProps {
  data: Review;
}

export const ReviewCard: React.FC<ReviewProps> = ({ data }) => {
  const { id, img, name, rating, watchAgain } = data;

  return (
    <FlexLayout
      flexDirection="column"
      key={id}
      space={4}
      sx={{
        border: `1px solid ${theme.colors['gray-600']}`,
        borderRadius: 'm',
      }}
    >
      <FlexLayout alignItems="flex-start" flexDirection="row" justifyContent="space-between" space={2}>
        <Link style={{ width: '100%', height: '440px' }} to={`/review/${id}`}>
          <img
            alt={`${name} poster`}
            src={img ? `data:image/jpeg;base64,${img}` : defaultPoster}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '440px',
              objectFit: 'fill',
            }}
          />
        </Link>
      </FlexLayout>
      <FlexLayout flexDirection="column" p={4} space={4}>
        <FlexLayout flexDirection="column" space={2}>
          <Text color="white-alpha-50" variant="text-l-bold">
            Name
          </Text>
          <TextWithIcon
            iconColor="green"
            iconRight={watchAgain ? 'checkBadge' : undefined}
            iconSize="l"
            iconTitle="I would watch again or recommend."
            text={name}
            variant="text-m-bold"
          />
        </FlexLayout>
        <Divider />
        <FlexLayout flexDirection="column" space={2}>
          <Text color="white-alpha-50" variant="text-l-bold">
            Rating
          </Text>
          <RatingStars isReadOnly rating={rating} />
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
};
