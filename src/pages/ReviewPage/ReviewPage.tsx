import { useParams } from 'react-router';

interface UseParamsData {
  reviewId: string;
}

export const ReviewPage = () => {
  const { reviewId }: UseParamsData = useParams();

  return <h1>Review page for review id {reviewId}</h1>;
};
