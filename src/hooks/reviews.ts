import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { deleteReviewById, getReviewById, getReviews } from '~/api';
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

  const history = useHistory();
  const queryClient = useQueryClient();
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

  if (error) {
    showErrorToast(error as AxiosError);
  }

  const handleDeleteReviewById = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setIsRequestLoading(true);
      deleteReviewById(id)
        .then(async () => {
          await queryClient.invalidateQueries('reviews');
          history.push('/dashboard');
          showToast({ text: 'Review successfully deleted.', variant: 'success' });
        })
        .catch((err) => showErrorToast(err))
        .finally(() => setIsRequestLoading(false));
    }
  };

  return {
    review,
    error,
    isLoading: isLoading || isRequestLoading,
    refetchReview,
    deleteReviewById: handleDeleteReviewById,
  };
}
