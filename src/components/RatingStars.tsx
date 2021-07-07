import Rating from 'react-rating';

import { Icon } from '~/ui';

interface RatingStarsProps {
  isReadOnly?: boolean;
  rating: number | null;
  onChange?(value: number): void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ isReadOnly = false, rating, onChange }) => {
  return (
    <Rating
      emptySymbol={<Icon color="white-alpha-75" icon="star" size="l" />}
      fullSymbol={<Icon icon="starFull" size="l" />}
      initialRating={rating ?? 0}
      readonly={isReadOnly}
      onChange={onChange}
    />
  );
};
