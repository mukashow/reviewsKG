import React, { useCallback, useState } from 'react';
import { Colors, Incubator, Text } from 'react-native-ui-lib';
import { NavigationProp } from '@react-navigation/native';
import { debounce } from 'lodash';
import { Container } from '../components';
import { useAppDispatch } from '../store';
import { searchUsers } from '../store/main/action';
import { User } from '../store/main/types';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export const Home = ({ navigation: { navigate } }: { navigation: NavigationProp<any> }) => {
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState<User[] | null>(null);
  const dispatch = useAppDispatch();

  const debounceHandler = useCallback(
    debounce((phone: string) => {
      if (phone.length > 2) {
        return dispatch(searchUsers({ phone }))
          .unwrap()
          .then(users => {
            setUsers(users);
            setStatus(users!.length ? '' : 'empty');
          });
      }
      setUsers([]);
      setStatus('');
    }, 300),
    []
  );

  const onChangeText = (phone: string) => {
    if (phone.length > 2) setStatus('loading');
    debounceHandler(phone);
  };

  return (
    <Container>
      <Incubator.TextField
        floatingPlaceholder
        onChangeText={onChangeText}
        placeholder="Введите номер телефона"
        keyboardType="numeric"
        preset="default"
        maxLength={9}
      />
      {status === 'loading' ? <ActivityIndicator /> : null}
      {status === 'empty' ? (
        <Text text80 color={Colors.grey20} center>
          Такого номера услуги на нашлось
        </Text>
      ) : null}
      <FlatList
        style={{
          marginHorizontal: -10,
          marginTop: -16,
          display: status !== 'loading' ? 'flex' : 'none',
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={users || []}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={style.userItem}
            onPress={() => navigate('UserProfile', { phone: item.phone })}
          >
            <Text text70>{item.phone}</Text>
            <Text text80>
              {item.services.length
                ? item.services.map(({ label }) => label).join(', ')
                : 'Нет добавленных услуг'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

const style = StyleSheet.create({
  userItem: {
    flex: 1,
    width: '100%',
    paddingVertical: 6,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey50,
  },
});
