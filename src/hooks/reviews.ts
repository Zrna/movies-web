import { useQuery } from 'react-query';

import { getReviews } from '~/api';
import { showToast } from '~/ui';

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
