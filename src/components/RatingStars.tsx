import Rating from 'react-rating';

import { Icon } from '~/ui';

interface RatingStarsProps {
  isReadOnly?: boolean;
  rating: number | null;
  size?: 'm' | 'l' | 'xl';
  onChange?(value: number): void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ isReadOnly = false, rating, size = 'l', onChange }) => {
  return (
    <Rating
      emptySymbol={<Icon color="white-alpha-75" icon="star" size={size} />}
      fullSymbol={<Icon icon="starFull" size={size} />}
      initialRating={rating ?? 0}
      readonly={isReadOnly}
      onChange={onChange}
    />
  );
};
