import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, signIn } from './action';
import { User } from './types';

type State = {
  isAuth: boolean;
  user: User;
};

const initialState: State = {
  isAuth: false,
  user: { phone: '', description: null, service: null },
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.isAuth = !!payload;
      if (payload) {
        state.user = payload;
      }
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload;
    });
  },
});

export const {} = auth.actions;

export default auth.reducer;
