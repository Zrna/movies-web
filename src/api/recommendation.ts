import { backend } from '~/services';

import { Recommendation } from './recommendation.d';

export const getRecommendation = async () => {
  return await backend.get<Recommendation>('/api/recommendation');
};
