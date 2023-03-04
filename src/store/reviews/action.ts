import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { FirebaseReview, Review, ReviewToSend } from './types';

export const fetchReviews = createAsyncThunk(
  'main/fetchReviews',
  async ({ phone }: { phone: string }) => {
    try {
      const reviews: Review[] = [];
      const snapshots = await firestore().collection('reviews').where('phone', '==', phone).get();

      snapshots.forEach(doc => {
        const data = <FirebaseReview>doc.data();
        reviews.push({
          ...data,
          id: doc.id,
          createdAt: new Date(data.createdAt.toDate()).toLocaleDateString(),
        });
      });

      return reviews;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const sendReview = createAsyncThunk(
  'main/sendReview',
  async ({ phone, review, rating, service, author }: ReviewToSend, { dispatch }) => {
    try {
      await firestore().collection('reviews').add({
        phone,
        review,
        rating,
        service,
        author,
        createdAt: firebase.firestore.Timestamp.now(),
      });
      const userSnapshots = await firestore().collection('users').where('phone', '==', phone).get();
      if (userSnapshots.size === 0) {
        await firestore()
          .collection('users')
          .add({
            phone,
            services: service ? [service] : [],
          });
      }
      dispatch(fetchReviews({ phone }));
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'main/deleteReview',
  async ({ id, phone }: { id: string; phone: string }, { dispatch }) => {
    try {
      await firestore().collection('reviews').doc(id).delete();
      dispatch(fetchReviews({ phone }));
    } catch (e) {
      console.log(e);
    }
  }
);
