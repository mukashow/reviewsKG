import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review, ReviewCreateForm } from './types';
import { api } from '../../api';
import { RootState } from '../index';

export const fetchReviews = createAsyncThunk<Review[], { phone: string }>(
  'main/fetchReviews',
  async ({ phone }) => {
    try {
      return (await api(`/reviews/${phone.replace('+', '%2b')}`)).data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const sendReview = createAsyncThunk(
  'main/sendReview',
  async ({ service, serviceProviderPhone, ...form }: ReviewCreateForm, { getState }) => {
    try {
      const { auth } = getState() as RootState;
      const { data } = await api.post('/reviews', {
        ...form,
        service: service ? service.value : null,
        author: `${auth.phone}`,
        serviceProviderPhone: `+996${serviceProviderPhone}`,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'main/deleteReview',
  async ({ id, phone }: { id: number; phone: string }, { dispatch }) => {
    try {
      await api.delete(`/reviews/${id}`);
      dispatch(fetchReviews({ phone }));
    } catch (e) {
      console.log(e);
    }
  }
);
