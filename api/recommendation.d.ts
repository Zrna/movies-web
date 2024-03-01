export interface Recommendation {
  id: number;
  name: string;
  type: 'movie' | 'tv show';
  genre: string[];
  img: string | null;
}
