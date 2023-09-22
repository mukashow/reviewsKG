import { createSlice } from '@reduxjs/toolkit';
import { Service } from './types';
import { fetchServices } from './action';

type State = {
  services: Service[] | null;
};

const initialState: State = {
  services: null,
};

export const service = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchServices.fulfilled, (state, { payload }) => {
      state.services = payload;
    });
  },
});

export const {} = service.actions;

export default service.reducer;
