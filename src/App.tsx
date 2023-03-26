import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native-ui-lib';
import { CodeVerification, Home, SignIn, SignUp, UserProfile, LeaveReview } from './screens';
import { store, useAppDispatch } from './store';
import { fetchAllServices } from './store/main/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from './store/auth/slice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors.violet30,
    primary: 'white',
    text: 'white',
  },
};

const MainTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Услуги' }} />
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
        options={{ title: 'Оставить отзыв', headerBackTitle: '' }}
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
      dispatch(setUserInfo({ phone, services }));
    })();
  }, []);

  if (loading) {
    return <View />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="light-content" />
      {isAuth ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={MainTab}
            options={{ header: () => null, tabBarLabel: 'Главная' }}
          />
          <Tab.Screen
            name="LeaveReview"
            component={LeaveReview}
            options={{ title: 'Оставить отзыв' }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Войти' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Регистрация' }} />
          <Stack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ title: 'Подтвердить код' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
