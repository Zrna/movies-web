import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { getReviewById, getReviews } from '~/api';
import { showToast } from '~/ui';
import { showErrorToast } from '~/utils';

export function useReviews() {
  const { data: reviews, error, isLoading, refetch: refetchReviews } = useQuery('reviews', getReviews);

  if (error) {
    showToast({ variant: 'error', text: "Can't get reviews" });
  }

  return {
    reviews,
    error,
    isLoading,
    refetchReviews,
  };
}

export function useReviewById(id: string) {
  const {
    data: review,
    error,
    isLoading,
    refetch: refetchReview,
  } = useQuery(['review', id], () => getReviewById(id), {
    enabled: !!id,
  });

  if (error) {
    showErrorToast(error as AxiosError);
  }

  return {
    review,
    error,
    isLoading,
    refetchReview,
  };
}
