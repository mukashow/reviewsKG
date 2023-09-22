import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api';
import { AuthResponse, User } from './types';

export const signIn = createAsyncThunk<User, { phone: string }>(
  'auth/signIn',
  async (obj, { rejectWithValue }) => {
    try {
      const res = (await api.post('auth/', { phone: '+996' + obj.phone })).data as AuthResponse;
      const { access, refresh, ...user } = res;
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify({ ...user })),
        AsyncStorage.setItem('access', access),
        AsyncStorage.setItem('refresh', refresh),
      ]);
      return user as User;
    } catch (e: any) {
      return rejectWithValue(e.response.data.errors);
    }
  }
);

export const checkAuth = createAsyncThunk<User | null>('auth/checkAuth', async () => {
  try {
    const token = await AsyncStorage.getItem('access');
    if (!token) return null;
    const user = JSON.parse((await AsyncStorage.getItem('user')) || '');
    return user as User;
  } catch (e) {
    return null;
  }
});
