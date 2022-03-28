import { useState } from 'react';
import { Form } from 'react-final-form';

import { CreateReview } from '~/api';
import { BackToLink, FormCheckbox, FormTextarea, FormTextInput, RatingStars } from '~/components';
import { useCreateReview } from '~/hooks';
import { Button, FlexLayout, Text } from '~/ui';
import { validator } from '~/utils';

type FormData = Omit<CreateReview, 'rating'>;

export const CreateReviewPage = () => {
  const { mutate: createReview } = useCreateReview();
  const [rating, setRating] = useState<number | null>(null);

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <BackToLink text="back to dashboard" to="/dashboard" />
      <Text color="primary" variant="display-heading-m">
        Create review
      </Text>
      <Form
        render={({ handleSubmit, hasValidationErrors, submitting }) => (
          <FlexLayout
            as="form"
            flexDirection="column"
            space={4}
            sx={{ width: ['100%', '500px'] }}
            onSubmit={handleSubmit}
          >
            <FormTextInput
              label="Name"
              labelColor="white"
              name="name"
              type="text"
              validate={validator.isEmpty("Field can't be empty")}
            />
            <FormTextarea
              label="Review"
              labelColor="white"
              name="review"
              validate={validator.isEmpty("Field can't be empty")}
            />
            <FormTextInput label="URL" labelColor="white" name="url" type="text" validate={validator.isURL()} />
            <FlexLayout flexDirection="column" space={2}>
              <Text as="label" color="white" variant="text-m-bold">
                Rating
              </Text>
              <RatingStars rating={rating} onChange={(value) => setRating(value)} />
            </FlexLayout>
            <FormCheckbox label="I would watch again or recommend" name="watchAgain" />
            <Button
              isDisabled={hasValidationErrors || submitting}
              isFullWidth
              isLoading={submitting}
              text="Create"
              type="sumbit"
              variant="primary"
            />
          </FlexLayout>
        )}
        onSubmit={(data: FormData) => createReview({ ...data, rating })}
      />
    </FlexLayout>
  );
};
