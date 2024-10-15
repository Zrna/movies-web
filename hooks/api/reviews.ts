import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createReview, deleteReviewById, getReviewById, getReviews, updateReviewById } from '~/api';
import { GetReviews, Review } from '~/interfaces/reviews';
import { showToast } from '~/ui';
import { showErrorToast } from '~/utils';

export function useReviews() {
  return useQuery('reviews', getReviews, {
    onError: (err: AxiosError) => {
      showErrorToast(err);
    },
  });
}

export function useReviewById(id: string) {
  return useQuery(['reviews', id], () => getReviewById(id), {
    enabled: !!id,
    onError: (err: AxiosError) => {
      return showErrorToast(err);
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation(createReview, {
    onSuccess: (newReview) => {
      queryClient.invalidateQueries('reviews');
      push(`/review/${newReview.id}`);
      showToast({ variant: 'success', text: 'Review successfully created' });
    },
    onError: (err: AxiosError) => {
      return showErrorToast(err);
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation(updateReviewById, {
    onMutate: (updatedData) => {
      const oldReviewsData: GetReviews | undefined = queryClient.getQueryData('reviews');
      const oldCurrentReviewData = oldReviewsData?.data.find((old) => old.id === Number(updatedData.id));

      const { rating, review, url, watchAgain } = updatedData.data;
      const updated = oldCurrentReviewData
        ? {
            ...oldCurrentReviewData,
            rating,
            review,
            url,
            watchAgain,
          }
        : updatedData.data;

      queryClient.setQueryData(['reviews', updatedData.id], updated);

      return () => {
        if (oldReviewsData) {
          queryClient.setQueryData(['reviews', updatedData.id], oldCurrentReviewData);
          queryClient.setQueryData('reviews', oldReviewsData);
        } else {
          queryClient.invalidateQueries('reviews');
        }
      };
    },
    onSuccess: (updatedData: Review) => {
      if (queryClient.getQueryData('reviews')) {
        queryClient.setQueryData(['reviews', updatedData.id], updatedData);
        queryClient.invalidateQueries('reviews');
      } else {
        queryClient.invalidateQueries('reviews');
      }
      showToast({ text: 'Review successfully updated.', variant: 'success' });
    },
    onError: (err: AxiosError, updatedData, rollback: any) => {
      if (rollback) rollback();
      return showErrorToast(err);
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation(deleteReviewById, {
    onSuccess: () => {
      push('/dashboard');
      queryClient.invalidateQueries('reviews');
      showToast({ text: 'Review successfully deleted.', variant: 'success' });
    },
    onError: (err: AxiosError, data, rollback: any) => {
      if (rollback) rollback();
      return showErrorToast(err);
    },
  });
}
