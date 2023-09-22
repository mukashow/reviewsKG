import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  CodeVerification,
  SignIn,
  SignUp,
  SignUpAsPerformer,
  SignUpSelectService,
} from '../screens';
import { Header } from '../components';
import { AuthStackParamList } from '../types';
import { MyTheme } from './index';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <NavigationContainer independent theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ header: Header, contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen name="SignIn" component={SignIn} options={{ header: () => null }} />
        <Stack.Screen
          name="CodeVerification"
          component={CodeVerification}
          options={{ title: 'Подтвержение' }}
        />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Регистрация' }} />
        <Stack.Screen
          name="SignUpAsPerformer"
          component={SignUpAsPerformer}
          options={{ title: 'Регистрация' }}
        />
        <Stack.Screen
          name="SignUpSelectService"
          component={SignUpSelectService}
          options={{
            title: 'Регистрация',
            headerStyle: { backgroundColor: '#F9F9F9' },
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            contentStyle: { backgroundColor: '#F9F9F9' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
