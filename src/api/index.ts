import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const api = axios.create({
  baseURL: 'http://195.38.164.33:5001',
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
