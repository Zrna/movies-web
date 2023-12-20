import { useState } from 'react';
import { Form } from 'react-final-form';

import { CreateReview } from '~/api';
import { BackToLink, ButtonLink, FormCheckbox, FormTextarea, FormTextInput, Rating } from '~/components';
import { useCreateReview } from '~/hooks';
import { Box, Button, FlexLayout, Text, useScreenType } from '~/ui';
import { validator } from '~/utils';

import { Section } from './Section';

type FormData = Omit<CreateReview, 'rating'>;

export const CreateReviewPage = () => {
  const { isDesktop } = useScreenType();
  const { mutateAsync: createReview } = useCreateReview();

  const [rating, setRating] = useState<number | null>(null);

  return (
    <FlexLayout flexDirection="column" space={[4, 7]}>
      <BackToLink text="Back to All Reviews" to="/dashboard" />
      <FlexLayout flexDirection="column" py={5} space={[6, 8]} sx={{ maxWidth: '984px' }}>
        <Text sx={{ alignSelf: 'center' }} variant={isDesktop ? 'headline-h1' : 'headline-h3'}>
          Create review
        </Text>
        <Form
          render={({ handleSubmit, hasValidationErrors, submitting }) => (
            <FlexLayout
              as="form"
              flexDirection="column"
              space={[6, 8]}
              sx={{ minWidth: ['300px', '100%', '984px'] }}
              onSubmit={handleSubmit}
            >
              <Section number="01." title="Name & Link">
                <FormTextInput
                  name="name"
                  placeholder="Movie/TV Show name"
                  validate={validator.isEmpty("Field can't be empty")}
                />
                <FormTextInput name="url" placeholder="URL link to watch" validate={validator.isURL()} />
              </Section>
              <Section number="02." title="Your opinion">
                <FormTextarea
                  name="review"
                  placeholder="Write your review..."
                  validate={validator.isEmpty("Field can't be empty")}
                />
                <FlexLayout flexDirection={['column', 'row']} space={5}>
                  <FlexLayout flexDirection="column" space={3}>
                    <Text as="label" color="dimmed" variant="paragraph-default">
                      Rating
                    </Text>
                    <Rating rating={rating} onChange={(value) => setRating(value)} />
                  </FlexLayout>
                  <FlexLayout flexDirection="column" space={3}>
                    <Text as="label" color="dimmed" variant="paragraph-default">
                      Watch again or recommend?
                    </Text>
                    <FormCheckbox name="watchAgain" />
                  </FlexLayout>
                </FlexLayout>
              </Section>
              <FlexLayout flexDirection={['column-reverse', 'row']} space={5}>
                <Box sx={{ width: '100%' }}>
                  <ButtonLink
                    isDisabled={submitting}
                    isFullWidth
                    text="Cancel"
                    to="/dashboard"
                    type="reset"
                    variant="outlined-secondary"
                  />
                </Box>
                <Button
                  isDisabled={hasValidationErrors || submitting}
                  isFullWidth
                  isLoading={submitting}
                  text="Create Review"
                  type="sumbit"
                  variant="primary"
                />
              </FlexLayout>
            </FlexLayout>
          )}
          onSubmit={async (data: FormData) => await createReview({ ...data, rating })}
        />
      </FlexLayout>
    </FlexLayout>
  );
};
