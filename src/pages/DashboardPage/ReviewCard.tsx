import { Link } from 'react-router-dom';

import { Review } from '~/api';
import { Base64Img, Indicator } from '~/components';
import { FlexLayout, Icon, Text } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

const getReviewIndicatorColor = (rating: number | null) => {
  if (!rating) {
    return 'dimmed';
  }

  if (rating <= 2) {
    return 'red';
  }

  if (rating === 3) {
    return 'orange';
  }

  return 'green';
};

export const ReviewCard = ({ data, isBig = false }: { data: Review; isBig?: boolean }) => {
  const { id, img, name, rating, watchAgain } = data;

  return (
    <FlexLayout
      flexDirection="column"
      key={id}
      sx={{
        width: isBig ? ['312px', '624px'] : 'auto',
        maxWidth: isBig ? '624px' : ['100%', '100%', '312px'],
        minWidth: '280px',
        height: '370px',
        position: 'relative',
        borderRadius: '30px',
        transition: 'transform 500ms',
        ':hover': {
          transform: 'scale(1.05)',
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
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(80%)',
            borderRadius: '30px',
          }}
        />
        <FlexLayout
          flexDirection="column"
          pb={6}
          px={5}
          space={2}
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: 'linear-gradient(0deg, rgb(0 0 0 / 60%) 0%, rgb(0 0 0 / 0%) 100%)',
          }}
        >
          <Text sx={{ wordWrap: 'break-word' }} variant="headline-h3">
            {name}
          </Text>
          <FlexLayout justifyContent="space-between">
            <FlexLayout
              alignItems="center"
              bg="white-alpha-25"
              px={3}
              py={2}
              space={2}
              sx={{ width: '100px', borderRadius: '50px', backdropFilter: 'blur(5px)' }}
            >
              <Indicator color={getReviewIndicatorColor(rating)} />
              <Text color="white" variant="headline-h6">
                {rating?.toFixed(1) ?? 'Not'} Rated
              </Text>
            </FlexLayout>
            {watchAgain && (
              <FlexLayout
                alignItems="center"
                bg="white-alpha-25"
                justifyContent="center"
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backdropFilter: 'blur(5px)',
                }}
                title="I would watch again or recommend."
              >
                <Icon color="white" icon="check" size="l" />
              </FlexLayout>
            )}
          </FlexLayout>
        </FlexLayout>
      </Link>
    </FlexLayout>
  );
};
