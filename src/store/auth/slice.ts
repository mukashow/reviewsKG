import { createSlice } from '@reduxjs/toolkit';
import { Service } from '../main/types';

type State = {
  services: Service[] | null;
  phone: string;
};

const initialState: State = {
  services: null,
  phone: '',
};

export const main = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.services = payload.services;
      state.phone = payload.phone;
    },
  },
  extraReducers: builder => {},
});

export const { setUserInfo } = main.actions;

export default main.reducer;
