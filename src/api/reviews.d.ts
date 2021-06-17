export interface Review {
  id: number;
  userId: number;
  name: string;
  rating: number | null;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetReviews {
  data: Review[];
  totalRecords: number;
}

export interface CreateReview {
  name: string;
  review: string;
}