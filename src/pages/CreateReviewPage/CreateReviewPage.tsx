import { useState } from 'react';
import { Form } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { CreateReview, createReview } from '~/api';
import { BackToLink, FormTextarea, FormTextInput, RatingStars } from '~/components';
import { Button, FlexLayout, showToast, Text } from '~/ui';
import { showErrorToast, sleep, validator } from '~/utils';

export const CreateReviewPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number | null>(null);

  const handleCreateReview = async (data: CreateReview) => {
    try {
      await sleep(1000);
      await createReview({
        ...data,
        rating,
      });
      queryClient.invalidateQueries('reviews');
      history.push('/dashboard');
      showToast({ variant: 'success', text: 'Review successfully created' });
    } catch (e) {
      showErrorToast(e);
    }
  };

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
            <FlexLayout flexDirection="column" space={2}>
              <Text as="label" color="white" variant="text-m-bold">
                Rating
              </Text>
              <RatingStars rating={rating} onChange={(value) => setRating(value)} />
            </FlexLayout>
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
        onSubmit={handleCreateReview}
      />
    </FlexLayout>
  );
};
