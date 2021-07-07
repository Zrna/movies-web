import isEqual from 'lodash/isEqual';
import { useState } from 'react';
import { Form } from 'react-final-form';

import { Review, UpdateReview } from '~/api';
import { FormCheckbox, FormTextarea, FormTextInput, RatingStars } from '~/components';
import { Button, FlexLayout, Text, useScreenType } from '~/ui';
import { validator } from '~/utils';

interface EditContentFormProps {
  data: Review;
  onSubmit: (data: UpdateReview) => void;
}

export const EditContentForm: React.FC<EditContentFormProps> = ({ data, onSubmit }) => {
  const { isMobile } = useScreenType();
  const { rating, url, review, watchAgain } = data;
  const [updatedRating, setUpdatedRating] = useState<number | null>(rating);

  return (
    <FlexLayout flexDirection="column" space={4}>
      <Form
        initialValues={{ review, url, watchAgain }}
        render={({ handleSubmit, hasValidationErrors, submitting, initialValues, values }) => {
          const valuesNotChanged = isEqual(initialValues, values) && updatedRating === rating;

          return (
            <FlexLayout as="form" flexDirection="column" space={4} onSubmit={handleSubmit}>
              <FlexLayout flexDirection="column" space={2}>
                <Text color="white" variant="text-m-bold">
                  Rating
                </Text>
                <RatingStars rating={updatedRating} onChange={(value) => setUpdatedRating(value)} />
              </FlexLayout>
              <FormTextInput label="URL" labelColor="white" name="url" type="text" validate={validator.isURL()} />
              <FormCheckbox label="I would watch again or recommend" name="watchAgain" />
              <FormTextarea
                label="Review"
                labelColor="white"
                name="review"
                validate={validator.isEmpty("Field can't be empty")}
              />
              <Button
                isDisabled={valuesNotChanged || hasValidationErrors}
                isFullWidth={isMobile}
                isLoading={submitting}
                text="Edit review"
                type="submit"
              />
            </FlexLayout>
          );
        }}
        onSubmit={(data: UpdateReview) => {
          const { review, url, watchAgain } = data;

          onSubmit({
            rating: updatedRating,
            review,
            url,
            watchAgain,
          });
        }}
      />
    </FlexLayout>
  );
};
