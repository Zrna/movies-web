export interface Review {
  id: number;
  userId: number;
  name: string;
  rating: number | null;
  review: string;
  url: string | null;
  watchAgain: boolean;
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
  url?: string | null;
  watchAgain: boolean;
}

export interface UpdateReview {
  rating?: number | null;
  review: string;
  url?: string | null;
  watchAgain: boolean;
}
