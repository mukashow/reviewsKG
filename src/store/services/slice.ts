import { createSlice } from '@reduxjs/toolkit';
import { Service } from '../main/types';
import { fetchMyServices } from './action';

type State = {
  myServices: Service[] | null;
};

const initialState: State = {
  myServices: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMyServices.fulfilled, (state, { payload }) => {
      // state.myServices = payload;
    });
  },
});

export const {} = main.actions;

export default main.reducer;
