import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileHome } from './ProfileHome';
import { EditProfile } from './EditProfile';
import { MyTheme } from '../../App';
import { Header } from '../../components';
import { EditService } from './EditService';

export type StackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  EditService: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export const MyProfile = () => {
  return (
    <NavigationContainer independent theme={MyTheme}>
      <Stack.Navigator screenOptions={{ header: props => <Header {...props} variant="round" /> }}>
        <Stack.Screen name="ProfileHome" options={{ title: 'Профиль' }}>
          {props => <ProfileHome {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="EditProfile"
          options={{
            title: 'Редактирование',
            header: Header,
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          {props => <EditProfile {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="EditService"
          options={{
            title: 'Редактирование',
            header: props => <Header {...props} background="#f9f9f9" />,
          }}
        >
          {props => <EditService {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
