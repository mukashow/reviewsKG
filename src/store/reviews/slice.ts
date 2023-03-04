import { createSlice } from '@reduxjs/toolkit';
import { Review } from './types';
import { fetchReviews } from './action';

type State = {
  reviews: Review[] | null;
};

const initialState: State = {
  reviews: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReviews.fulfilled, (state, { payload }) => {
      state.reviews = payload!;
    });
  },
});

export const {} = main.actions;

export default main.reducer;
