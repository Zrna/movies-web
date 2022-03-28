import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { createReview, deleteReviewById, getReviewById, getReviews, Review, updateReviewById } from '~/api';
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
  const history = useHistory();

  return useMutation(createReview, {
    onSuccess: (newReview) => {
      queryClient.invalidateQueries('reviews');
      history.push(`/review/${newReview.id}`);
      showToast({ variant: 'success', text: 'Review successfully created' });
    },
    onError: (err: AxiosError) => {
      return showErrorToast(err);
    },
  });
}

interface CachedReviews {
  data: Review[];
  totalRecords: number;
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation(updateReviewById, {
    onMutate: (updatedData) => {
      const oldReviewsData: CachedReviews | undefined = queryClient.getQueryData('reviews');
      const oldCurrentReviewData = oldReviewsData?.data.find((old) => old.id === Number(updatedData.id));

      queryClient.setQueryData(['reviews', updatedData.id], updatedData.data);

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
  const history = useHistory();

  return useMutation(deleteReviewById, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
      history.push('/dashboard');
      showToast({ text: 'Review successfully deleted.', variant: 'success' });
    },
    onError: (err: AxiosError, data, rollback: any) => {
      if (rollback) rollback();
      return showErrorToast(err);
    },
  });
}
