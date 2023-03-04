import { Service } from '../main/types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Timestamp = FirebaseFirestoreTypes.Timestamp;

export type Review = {
  id: string;
  phone: string;
  review: string;
  service: Service | null;
  rating: number;
  author: string;
  createdAt: string;
};

export type FirebaseReview = Omit<Review, 'createdAt'> & {
  createdAt: Timestamp;
};

export type ReviewToSend = Omit<Review, 'id' | 'createdAt'>;
