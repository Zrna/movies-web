import { Recommendation } from '~/interfaces/recommendation';
import { backend } from '~/services';

export const getRecommendation = async () => {
  return await backend.get<Recommendation>('/api/recommendation');
};
