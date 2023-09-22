import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewCreateForm, Reviews, SortKey } from './types';
import { api } from '../../api';

export const fetchMyReviews = createAsyncThunk<Reviews, string | undefined>(
  'main/fetchMyReviews',
  async (params = '') => {
    return (await api(`reviews/?${params}`)).data;
  }
);

export const fetchReviewSortKeys = createAsyncThunk<SortKey[]>(
  'main/fetchReviewSortKeys',
  async () => {
    return (await api('reviews/orders/')).data;
  }
);

export const sendReview = createAsyncThunk(
  'main/sendReview',
  async ({ service, serviceProviderPhone, ...form }: ReviewCreateForm, { getState }) => {
    try {
      // const { auth } = getState() as RootState;
      // const { data } = await api.post('/reviews', {
      //   ...form,
      //   service: service ? service.value : null,
      //   author: `${auth.phone}`,
      //   serviceProviderPhone: `+996${serviceProviderPhone}`,
      // });
      // console.log(data);
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
      dispatch(fetchMyReviews());
    } catch (e) {
      console.log(e);
    }
  }
);
