import Rating from 'react-rating';

import { Icon } from '~/ui';

interface RatingStarsProps {
  isReadOnly?: boolean;
  rating: number | null;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ isReadOnly = false, rating }) => {
  return (
    <Rating
      emptySymbol={<Icon icon="star" size="l" />}
      fullSymbol={<Icon icon="starFull" size="l" />}
      initialRating={rating ?? 0}
      readonly={isReadOnly}
    />
  );
};
