import { createSlice } from '@reduxjs/toolkit';
import { Reviews, SortKey } from './types';
import { fetchMyReviews, fetchReviewSortKeys } from './action';
import { SortDown, SortTop } from '../../assets/icon';

type State = {
  reviews: Reviews | null;
  sort: SortKey[] | null;
};

const initialState: State = {
  reviews: null,
  sort: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMyReviews.fulfilled, (state, { payload }) => {
      state.reviews = payload;
    });
    builder.addCase(fetchReviewSortKeys.fulfilled, (state, { payload }) => {
      state.sort = payload;
    });
  },
});

export const {} = main.actions;

export default main.reducer;
