import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  CodeVerification,
  Home,
  SignIn,
  SignUp,
  UserProfile,
  LeaveReview,
  MyProfile,
  SignUpAsPerformer,
  SignUpSelectService,
  Services as ServicesScreen,
} from './screens';
import { store, useAppDispatch } from './store';
import { fetchAllServices } from './store/main/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from './store/auth/slice';
import { BackButton, Home as HomeIcon, Services, Bag, Profile } from './assets/icon';
import { AppStackParamList } from './types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateReviewBtn } from './components';

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A0D1F',
    text: '#0A0D1F',
    background: 'white',
  },
};

const MainTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ route: { params } }: { route: RouteProp<any> }) => ({
          title: params!.phone,
          headerBackTitle: '',
        })}
      />
      <Stack.Screen
        name="LeaveReviewToUser"
        component={LeaveReview}
        options={{ title: 'Оставить отзыв' }}
      />
    </Stack.Navigator>
  );
};

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllServices());
    auth().onAuthStateChanged(user => {
      setIsAuth(!!user);
      setLoading(false);
    });
    (async () => {
      const [phone, services] = await Promise.all([
        AsyncStorage.getItem('phone'),
        AsyncStorage.getItem('services'),
      ]);
      dispatch(setUserInfo({ phone, services: services ? JSON.parse(services) : null }));
    })();
  }, []);

  if (loading) {
    return <View />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="dark-content" />
      {isAuth ? (
        <Tab.Navigator
          screenOptions={({ route: {} }) => ({
            tabBarLabelStyle: { fontSize: 11 },
            tabBarActiveTintColor: '#15A3F2',
            tabBarInactiveTintColor: '#888DA7',
          })}
        >
          <Tab.Screen
            name="Main"
            component={MainTab}
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
              tabBarButton: () => (
                <CreateReviewBtn onPress={() => navigation.navigate('LeaveReview')} />
              ),
            })}
          />
          <Tab.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              title: 'Профиль',
              tabBarIcon: ({ focused }) => <Profile fill={focused ? '#15A3F2' : '#888DA7'} />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerLeft: ({ canGoBack }) =>
              canGoBack ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 5, marginLeft: -5 }}
                >
                  <BackButton />
                </TouchableOpacity>
              ) : null,
            headerTitleStyle: { fontSize: 16 },
          })}
        >
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
            }}
          />

          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Регистрация' }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ header: () => null }} />
          <Stack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ title: 'Подтвержение' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <App />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};
