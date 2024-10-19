import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useKey } from 'react-use';
import { z } from 'zod';

import { BackToLink, CenteredLoadingSpinner, Rating, ReviewRating, StreamingApp, WatchAgain } from '~/components';
import { FormTextArea, FormTextInput } from '~/components/form-new';
import { useDeleteReview, useReviewById, useUpdateReview } from '~/hooks';
import { UpdateReview } from '~/interfaces/reviews';
import { ActionIcons, HeaderImage, reactionsMap, RoundedBox } from '~/pages-components/review';
import { Box, Button, FlexLayout, Icon, Text, useModal, useScreenType } from '~/ui';
import { formatDate, getUrlDomain, splitStringToNewLine } from '~/utils';

const UpdateReviewFormSchema = z.object({
  review: z.string().min(1, "Field can't be empty"),
  rating: z.number().nullable().optional(),
  url: z.string().min(2, 'Must contain at least 2 characters').nullable().optional(),
  watchAgain: z.boolean(),
});

export default function ReviewPage() {
  const { push, query } = useRouter();
  const reviewId = query.id as string;

  const { isMobile } = useScreenType();
  const { data: review, isLoading } = useReviewById(reviewId);
  const { mutateAsync: updateReview, isLoading: isUpdating } = useUpdateReview();
  const { mutateAsync: deleteReview } = useDeleteReview();
  const [deleteModal, showDeleteModal] = useModal({
    title: 'Delete review',
    content: 'Are you sure you want to delete this review?',
    actionButton: {
      text: 'Delete review',
      action: async () => deleteReview(reviewId),
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<UpdateReview>({
    resolver: zodResolver(UpdateReviewFormSchema),
    defaultValues: {
      review: '',
      rating: null,
      url: undefined,
      watchAgain: true,
    },
    values: review,
  });

  const contentRef = useRef<HTMLElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!reviewId) {
      return;
    }

    if (!isLoading && !review) {
      push('/dashboard');
    }
  }, [reviewId, review, isLoading]);

  useKey('Escape', () => {
    setIsEditMode(false);
  });

  if (isLoading || !review) {
    return <CenteredLoadingSpinner />;
  }

  const { image, name, updatedAt, watchAgain, rating, url } = review;
  const reviewUrlDomain = url && getUrlDomain(url);

  return (
    <FlexLayout flexDirection="column" space={2}>
      <BackToLink text="Back to All Reviews" to="/dashboard" />
      <FlexLayout flexDirection="column" p={4} pb={8} space={[6, 8, 9]}>
        <Box sx={{ position: 'relative' }}>
          <HeaderImage img={image?.img} name={name} />
          <ActionIcons
            isEditMode={isEditMode}
            onDelete={showDeleteModal}
            onEdit={() => {
              setIsEditMode(!isEditMode);
              if (!isEditMode) {
                contentRef.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
          <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 45%)' }}>
            {isEditMode ? (
              <Box bg="white-alpha-25" px={3} py={2} sx={{ borderRadius: '50px', backdropFilter: 'blur(5px)' }}>
                <Rating control={control} hideLabel />
              </Box>
            ) : (
              <ReviewRating rating={rating} />
            )}
          </Box>
        </Box>
        <FlexLayout flexDirection="column" ref={contentRef} space={7}>
          <Text sx={{ alignSelf: 'center' }} variant={isMobile ? 'headline-h2' : 'headline-h1'}>
            {name}
          </Text>
          <FlexLayout flexDirection="column" space={6}>
            <FlexLayout flexDirection={['column', 'row']} space={[3, 3, 5]} sx={{ alignSelf: ['unset', 'center'] }}>
              <RoundedBox
                element={
                  isEditMode ? (
                    <FormTextInput control={control} name="url" placeholder="URL link to watch" />
                  ) : (
                    <StreamingApp link={url} name={reviewUrlDomain} showName />
                  )
                }
                info={reviewUrlDomain || isEditMode ? '' : 'Link not provided.'}
                title="Watch it here"
              />
              <RoundedBox
                element={
                  isEditMode ? (
                    <WatchAgain control={control} hideLabel />
                  ) : (
                    watchAgain && (
                      <FlexLayout bg="dark" p={[2, 3]} sx={{ borderRadius: '50%' }}>
                        <Icon color="white" icon="check" size="l" />
                      </FlexLayout>
                    )
                  )
                }
                info={isEditMode ? '' : watchAgain ? 'Yes, for sure!' : "I'm not sure."}
                title="Watch again or recommend?"
              />
              <RoundedBox
                element={<Icon icon={reactionsMap[rating ?? 0].icon} size="xxl" />}
                info={reactionsMap[rating ?? 0].text}
                title="Your reaction"
              />
            </FlexLayout>
            <FlexLayout flexDirection="column" space={5}>
              <Text variant="headline-h4">Your review</Text>
              {isEditMode ? (
                <FormTextArea control={control} name="review" placeholder="Write your thoughts..." />
              ) : (
                <FlexLayout flexDirection="column" space={5}>
                  <Text>{splitStringToNewLine(review.review)}</Text>
                  <Text color="dimmed" variant="paragraph-small">
                    <i>Last updated on {formatDate(updatedAt)}</i>
                  </Text>
                </FlexLayout>
              )}
            </FlexLayout>
          </FlexLayout>
          {isEditMode && (
            <FlexLayout flexDirection={['column', 'row']} space={[4, 5]}>
              <Button
                isDisabled={isSubmitting || !isDirty}
                isFullWidth={isMobile}
                isLoading={isUpdating || isSubmitting}
                text="Save changes"
                onClick={handleSubmit(async (data) => {
                  await updateReview({ id: reviewId, data });
                  setIsEditMode(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                })}
              />
              <Button
                isFullWidth={isMobile}
                text="Cancel"
                variant="secondary"
                onClick={() => {
                  setIsEditMode(false);
                  reset();
                }}
              />
            </FlexLayout>
          )}
        </FlexLayout>
        {deleteModal}
      </FlexLayout>
    </FlexLayout>
  );
}
