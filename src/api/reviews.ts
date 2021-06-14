import { backend } from '~/services';

import { CreateReview, GetReviews, Review } from './reviews.d';

export const getReviews = async () => {
  return await backend.get<GetReviews>('/api/movies');
};

export const createReview = async (data: CreateReview) => {
  return await backend.post<Review>('/api/movies', data);
};
