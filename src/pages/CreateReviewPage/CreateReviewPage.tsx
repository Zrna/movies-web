import { Form } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { CreateReview, createReview } from '~/api';
import { FormTextInput } from '~/components';
import { Button, FlexLayout, showToast } from '~/ui';
import { showErrorToast, sleep, validator } from '~/utils';

export const CreateReviewPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const handleCreateReview = async (data: CreateReview) => {
    try {
      await sleep(1000);
      await createReview(data);
      queryClient.invalidateQueries('reviews');
      history.push('/dashboard');
      showToast({ variant: 'success', text: 'Review successfully created' });
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <FlexLayout justifyContent="center" p={6}>
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
            <FormTextInput
              label="Review"
              labelColor="white"
              name="review"
              type="text"
              validate={validator.isEmpty("Field can't be empty")}
            />
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
