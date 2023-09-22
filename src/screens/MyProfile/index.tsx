import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileHome } from './ProfileHome';
import { EditProfile } from './EditProfile';
import { EditService } from './EditService';
import { Header } from '../../components';
import { MyTheme } from '../../App';
import { useAppSelector } from '../../store';
import { AuthStack } from '../../App/AuthStack';
import { AppStackParamList } from '../../types';

export type StackParamList = {
  ProfileHome: {
    page: number;
    sort: {
      key: string;
      title: string;
    };
  };
  EditProfile: undefined;
  EditService: undefined;
};

type Props = NativeStackScreenProps<AppStackParamList, 'MyProfile'>;

const Stack = createNativeStackNavigator<StackParamList>();

export const MyProfile = ({ navigation }: Props) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <AuthStack />;
  }

  return (
    <NavigationContainer independent theme={MyTheme}>
      <Stack.Navigator screenOptions={{ header: props => <Header {...props} variant="round" /> }}>
        <Stack.Screen
          name="ProfileHome"
          options={{ title: 'Профиль' }}
          initialParams={{ page: 1, sort: { key: 'createdAt_desc', title: 'Сначала новые' } }}
        >
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
