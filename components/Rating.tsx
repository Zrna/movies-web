import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

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
  control: Control<any>;
  isReadOnly?: boolean;
  hideLabel?: boolean;
  onChange?(elementValue: number): void;
}

export const Rating: React.FC<RatingProps> = ({ control, hideLabel = false, isReadOnly = false }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange } }) => (
        <FlexLayout flexDirection="column" space={3}>
          {!hideLabel && (
            <Text as="label" color="dimmed" variant="paragraph-default">
              Rating
            </Text>
          )}
          <FlexLayout alignItems="center" space={5}>
            <FlexLayout space={2}>
              {Array.from(Array(5)).map((_, i) => {
                const elementValue = i + 1;
                const isActive = checkIsActive(elementValue, value, hoveredRating);

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
                        onChange(elementValue);
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
            <Text color="primary">{hoveredRating ?? value ?? 0}/5</Text>
          </FlexLayout>
        </FlexLayout>
      )}
    />
  );
};
