import { ServiceSelect, ThumbService } from '../service/types';

export type Sort = 'createdAt_asc' | 'createdAt_desc' | 'rating_asc' | 'rating_desc';

export type SortKey = {
  key: Sort;
  id: number;
  title: string;
};

export type Reviews = {
  hasMore: boolean;
  result: Review[];
  page: number;
};

export type Review = {
  id: number;
  author: string;
  serviceProviderPhone: string;
  review: string;
  service?: ThumbService;
  rating?: number;
  createdAt: string;
};

export type ReviewCreateForm = {
  serviceProviderPhone: string;
  review: string;
  service: ServiceSelect | null;
  rating: number;
};
