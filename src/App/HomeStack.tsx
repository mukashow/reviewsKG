import React from 'react';
import { Home, SearchResult } from '../screens';
import { Header } from '../components';
import { Stack } from './index';

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ title: 'Результаты поиска', headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};
