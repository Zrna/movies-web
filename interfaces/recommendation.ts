export interface Recommendation {
  id: number;
  name: string;
  type: 'movie' | 'tv show';
  genre: string[];
  img: null | {
    id: number;
    name: string;
    img: string;
    createdAt: string;
    updatedAt: string;
  };
}
