import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_KEY } from '@env';
import Toast from 'react-native-toast-message';
import { store } from '../store';
import { checkAuth } from '../store/auth/action';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('access');

  config.headers['X-API-KEY'] = API_KEY;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      try {
        const localRefresh = await AsyncStorage.getItem('refresh');
        const response = await axios.post(
          API_URL + 'auth/refresh/',
          {},
          { headers: { Authorization: `Bearer ${localRefresh}` } }
        );
        const { access, refresh } = response.data;

        await AsyncStorage.setItem('access', access);
        await AsyncStorage.setItem('refresh', refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(error.config);
      } catch (e) {
        console.log(e);
        await AsyncStorage.clear();
        store.dispatch(checkAuth());
      }
    }

    if (error.response.status !== 401) {
      if (typeof error.response.data === 'string') {
        return Toast.show({ type: 'error', text1: error.response.data });
      }

      if (typeof error.response.data.message) {
        return Toast.show({ type: 'error', text1: error.response.data.message });
      }
    }

    return Promise.reject(error);
  }
);
