import { Link } from 'react-router-dom';

import { Review } from '~/api';
import { Base64Img, RatingStars, TextWithIcon } from '~/components';
import { FlexLayout, theme } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

export const ReviewCard = ({ data }: { data: Review }) => {
  const { id, img, name, rating, watchAgain } = data;

  return (
    <FlexLayout
      bg={theme.colors.dark}
      flexDirection="column"
      key={id}
      sx={{
        transition: 'transform 500ms',
        ':hover': {
          boxShadow: `0px 0px 10px 5px ${theme.colors.dimmed}`,
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
            iconColor="green-500"
            iconRight={watchAgain ? 'checkBadge' : undefined}
            iconSize="l"
            iconTitle="I would watch again or recommend."
            text={name}
            variant="paragraph-default"
          />
          <RatingStars isReadOnly rating={rating} size="m" />
        </FlexLayout>
      </Link>
    </FlexLayout>
  );
};
