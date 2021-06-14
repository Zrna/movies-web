import { backend } from '~/services';

import { GetReviews } from './reviews.d';

export const getReviews = async () => {
  return await backend.get<GetReviews>('/api/movies');
};
