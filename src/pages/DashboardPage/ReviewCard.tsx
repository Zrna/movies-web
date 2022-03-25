import { Link } from 'react-router-dom';

import { Review } from '~/api';
import { Base64Img, RatingStars, TextWithIcon } from '~/components';
import { FlexLayout, theme } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

interface ReviewProps {
  data: Review;
}

export const ReviewCard: React.FC<ReviewProps> = ({ data }) => {
  const { id, img, name, rating, watchAgain } = data;

  return (
    <FlexLayout
      bg={theme.colors.dark}
      flexDirection="column"
      key={id}
      sx={{
        transition: 'transform 500ms',
        ':hover': {
          boxShadow: `0px 0px 10px 5px ${theme.colors['gray-500']}`,
          transform: 'scale(1.1)',
          transition: 'transform 500ms',
          zIndex: 1,
        },
      }}
    >
      <Link style={{ height: '100%' }} to={`/review/${id}`}>
        <Base64Img
          alt={`${name} poster`}
          placeHolder={defaultPoster}
          src={img}
          style={{
            width: '100%',
            height: '80%',
          }}
        />
        <FlexLayout alignItems="center" flexDirection="column" py={2} space={2}>
          <TextWithIcon
            iconColor="green"
            iconRight={watchAgain ? 'checkBadge' : undefined}
            iconSize="l"
            iconTitle="I would watch again or recommend."
            text={name}
            variant="text-l-medium"
          />
          <RatingStars isReadOnly rating={rating} size="m" />
        </FlexLayout>
      </Link>
    </FlexLayout>
  );
};
