export interface Review {
  id: number;
  userId: number;
  name: string;
  rating: number | null;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviews {
  data: Review[];
  totalRecords: number;
}

export interface CreateReview {
  name: string;
  review: string;
  rating?: number | null;
}

export interface UpdateReview {
  rating?: number | null;
  review: string;
}
