import { ServiceSelect } from '../main/types';

export type Review = {
  id: number;
  author: string;
  serviceProviderPhone: string;
  review: string;
  service: number | null;
  rating: number;
  createdAt: string;
};

export type ReviewCreateForm = {
  serviceProviderPhone: string;
  review: string;
  service: ServiceSelect | null;
  rating: number;
};
