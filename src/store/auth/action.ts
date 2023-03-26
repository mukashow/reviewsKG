import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from './slice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const signIn = createAsyncThunk(
  'main/signIn',
  async (user: FirebaseAuthTypes.User, { dispatch }) => {
    const token = await user.getIdToken();
    await AsyncStorage.setItem('token', token);
    try {
      const { data } = await api.post('/auth');
      await Promise.all([
        AsyncStorage.setItem('phone', data.phone),
        AsyncStorage.setItem('services', JSON.stringify(data.services)),
      ]);
      dispatch(setUserInfo({ phone: data.phone, services: data.services }));
    } catch (e) {
      console.log(e);
    }
  }
);
