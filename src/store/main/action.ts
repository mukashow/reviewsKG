import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Service, User } from './types';

export const fetchAllServices = createAsyncThunk('main/fetchAllServices', async () => {
  try {
    const services: Service[] = [];
    const snapshots = await firestore().collection('service').get();

    snapshots.forEach(doc => {
      services.push({
        label: doc.data().title,
        value: doc.id,
      });
    });

    return services;
  } catch (e) {
    console.log(e);
  }
});

export const searchUsers = createAsyncThunk(
  'main/searchUserService',
  async ({ phone }: { phone: string }) => {
    try {
      const users: User[] = [];

      const snapshots = await firestore()
        .collection('users')
        .where('phone', '>=', phone)
        .where('phone', '<=', phone + '\uf8ff')
        .get();

      snapshots.forEach(doc => {
        users.push(<User>{
          ...doc.data(),
          id: doc.id,
        });
      });

      return users;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);
