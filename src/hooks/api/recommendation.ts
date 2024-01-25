import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { getRecommendation } from '~/api';
import { showErrorToast } from '~/utils';

export function useRecommendation(options?: UseQueryOptions) {
  return useQuery('recommendation', getRecommendation, {
    onError: (err: AxiosError) => showErrorToast(err),
    enabled: options?.enabled ?? true,
  });
}
