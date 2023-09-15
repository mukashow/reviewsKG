import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { API_URL } from '@env';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      try {
        const token = await auth().currentUser?.getIdToken();
        await AsyncStorage.setItem('token', token || '');
        await api(error.config);
      } catch (e) {
        await auth().signOut();
        await Promise.reject(error);
      }
      return;
    }
    await Promise.reject(error);
  }
);
