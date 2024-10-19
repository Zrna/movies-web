import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BackToLink, ButtonLink, FormTextArea, FormTextInput, Rating, WatchAgain } from '~/components';
import { useCreateReview } from '~/hooks';
import { CreateReview } from '~/interfaces/reviews';
import { Section } from '~/pages-components/create-review';
import { Box, Button, FlexLayout, Text, useScreenType } from '~/ui';

const CreateReviewFormSchema = z.object({
  name: z.string().min(1, "Field can't be empty"),
  review: z.string().min(1, "Field can't be empty"),
  rating: z.number().nullable().optional(),
  url: z.string().min(2, 'Must contain at least 2 characters').nullable().optional(),
  watchAgain: z.boolean(),
});

export default function CreateReviewPage() {
  const { mutateAsync: createReview } = useCreateReview();

  const { isDesktop } = useScreenType();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateReview>({
    resolver: zodResolver(CreateReviewFormSchema),
    defaultValues: {
      name: '',
      review: '',
      rating: null,
      url: undefined,
      watchAgain: true,
    },
  });

  return (
    <FlexLayout flexDirection="column" space={[4, 7]}>
      <BackToLink text="Back to All Reviews" to="/dashboard" />
      <FlexLayout flexDirection="column" py={5} space={[6, 8]} sx={{ maxWidth: '984px' }}>
        <Text sx={{ alignSelf: 'center' }} variant={isDesktop ? 'headline-h1' : 'headline-h3'}>
          Create review
        </Text>
        <FlexLayout as="form" flexDirection="column" space={[6, 8]} sx={{ minWidth: ['300px', '100%', '984px'] }}>
          <Section number="01." title="Name & Link">
            <FormTextInput control={control} name="name" placeholder="Movie/TV Show name" />
            <FormTextInput control={control} name="url" placeholder="URL link to watch" />
          </Section>
          <Section number="02." title="Your opinion">
            <FormTextArea control={control} name="review" placeholder="Write your thoughts..." />
            <FlexLayout flexDirection={['column', 'row']} space={5}>
              <Rating control={control} />
              <WatchAgain control={control} />
            </FlexLayout>
          </Section>
          <FlexLayout flexDirection={['column-reverse', 'row']} space={5}>
            <Box sx={{ width: '100%' }}>
              <ButtonLink
                isDisabled={isSubmitting}
                isFullWidth
                text="Cancel"
                to="/dashboard"
                type="reset"
                variant="outlined-secondary"
              />
            </Box>
            <Button
              isFullWidth
              isLoading={isSubmitting}
              text="Create Review"
              type="sumbit"
              variant="primary"
              onClick={handleSubmit(async (data) => createReview(data))}
            />
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
}
