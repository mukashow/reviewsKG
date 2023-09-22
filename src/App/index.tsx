import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LeaveReview, MyProfile, Services as ServicesScreen } from '../screens';
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';
import { CreateReviewBtn } from '../components';
import { Home as HomeIcon, Services, Bag, Profile } from '../assets/icon';
import { fetchServices } from '../store/service/action';
import { store, useAppDispatch } from '../store';
import { checkAuth } from '../store/auth/action';
import { AppStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A0D1F',
    text: '#0A0D1F',
    background: '#F9F9F9',
  },
};

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchServices());
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 11 },
          tabBarActiveTintColor: '#15A3F2',
          tabBarInactiveTintColor: '#888DA7',
        }}
      >
        <Tab.Screen
          name="Main"
          component={HomeStack}
          options={{
            header: () => null,
            tabBarLabel: 'Главная',
            tabBarIcon: ({ focused }) => <HomeIcon fill={focused ? '#15A3F2' : '#888DA7'} />,
          }}
        />
        <Tab.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            title: 'Услуги',
            tabBarIcon: ({ focused }) => <Services fill={focused ? '#15A3F2' : '#888DA7'} />,
          }}
        />
        <Tab.Screen
          name="LeaveReview"
          component={LeaveReview}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarButton: ({ to }) => (
              <CreateReviewBtn onPress={() => navigation.navigate('LeaveReview')} />
            ),
          })}
        />
        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerShown: false,
            title: 'Профиль',
            tabBarIcon: ({ focused }) => <Profile fill={focused ? '#15A3F2' : '#888DA7'} />,
          }}
        />
        <Tab.Screen
          name="Auth"
          component={AuthStack}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <App />
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};
