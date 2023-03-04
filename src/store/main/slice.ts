import { createSlice } from '@reduxjs/toolkit';
import { fetchAllServices } from './action';
import { Service } from './types';

type State = {
  services: Service[];
};

const initialState: State = {
  services: [],
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllServices.fulfilled, (state, { payload }) => {
      state.services = payload!;
    });
  },
});

export const {} = main.actions;

export default main.reducer;
