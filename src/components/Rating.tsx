import { useEffect, useState } from 'react';

import { Box, FlexLayout, Text, theme } from '~/ui';

/**
 * Check if the rating indicator should be in the active (green) state
 *
 * @param elementValue - the element `index + 1` value
 * @param rating - current rating value
 * @param hoveredRating - hovered rating value
 */
const checkIsActive = (elementValue: number, rating: number | null, hoveredRating: number | null) => {
  if (hoveredRating) {
    return elementValue <= hoveredRating - 1;
  }

  if (rating) {
    return elementValue <= rating;
  }

  return false;
};

interface RatingProps {
  isReadOnly?: boolean;
  rating: number | null;
  onChange?(elementValue: number): void;
}

export const Rating: React.FC<RatingProps> = ({ isReadOnly = false, rating, onChange }) => {
  const [newRating, setNewRating] = useState(rating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => setNewRating(rating), [rating]);

  return (
    <FlexLayout alignItems="center" space={5}>
      <FlexLayout space={2}>
        {Array.from(Array(5)).map((_, i) => {
          const elementValue = i + 1;
          const isActive = checkIsActive(elementValue, newRating, hoveredRating);

          return (
            <FlexLayout
              alignItems="center"
              justifyContent="center"
              key={`rating-${i}`}
              sx={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${isActive ? theme.colors.primary : theme.colors['light-dark']}`,
                cursor: isReadOnly ? 'unset' : 'pointer',
                ':hover': isReadOnly
                  ? {}
                  : {
                      border: `2px solid ${isActive ? theme.colors['light-dark'] : theme.colors.primary}`,
                      div: {
                        backgroundColor: isActive ? 'light-dark' : 'primary',
                      },
                    },
              }}
              onClick={() => {
                if (!isReadOnly) {
                  setNewRating(elementValue);
                  onChange && onChange(elementValue);
                }
              }}
              onMouseEnter={() => !isReadOnly && setHoveredRating(elementValue)}
              onMouseLeave={() => !isReadOnly && setHoveredRating(null)}
            >
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'primary' : 'light-dark',
                }}
              />
            </FlexLayout>
          );
        })}
      </FlexLayout>
      <Text color="primary">{hoveredRating ?? newRating ?? 0}/5</Text>
    </FlexLayout>
  );
};
