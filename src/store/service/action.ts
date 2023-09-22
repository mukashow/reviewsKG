import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { RootState } from '../index';
import { Service } from './types';

export const fetchServices = createAsyncThunk<Service[]>('service/fetchServices', async () => {
  return (await api('services/')).data;
});

export const fetchMyServices = createAsyncThunk(
  'main/fetchMyServices',
  async (_, { getState, dispatch }) => {
    try {
      const { auth } = getState() as RootState;
      const { data } = await api('/users/service');
      // await Promise.all([
      //   AsyncStorage.setItem('phone', auth.phone),
      //   AsyncStorage.setItem('services', JSON.stringify(data)),
      // ]);
      // const [phone, services] = await Promise.all([
      //   AsyncStorage.getItem('phone'),
      //   AsyncStorage.getItem('services'),
      // ]);
    } catch (e) {}
  }
);

export const addService = createAsyncThunk<void, number>(
  'main/addService',
  async (id, { dispatch }) => {
    try {
      await api.post(`/users/services/${id}`);
      dispatch(fetchMyServices());
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteService = createAsyncThunk<void, number>(
  'main/deleteService',
  async (id, { dispatch }) => {
    try {
      await api.delete(`/users/services/${id}`);
      dispatch(fetchMyServices());
    } catch (e) {
      console.log(e);
    }
  }
);
