import { createAsyncThunk } from '@reduxjs/toolkit';
import { Service, User } from './types';
import { api } from '../../api';

export const fetchAllServices = createAsyncThunk<Service[]>('main/fetchAllServices', async () => {
  try {
    return (await api('/services')).data;
  } catch (e) {
    console.log(e);
  }
});

export const searchUsers = createAsyncThunk<User[], { phone: string; service: Service | null }>(
  'main/searchUserService',
  async ({ phone, service }) => {
    try {
      return (await api(`/users/search/users/?q=%2b996${phone}&service=${service}`)).data;
    } catch (e) {
      console.log(e);
    }
  }
);
