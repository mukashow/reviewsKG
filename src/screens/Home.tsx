import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Incubator, Picker, Text } from 'react-native-ui-lib';
import { NavigationProp } from '@react-navigation/native';
import { debounce } from 'lodash';
import { Container } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { searchUsers } from '../store/main/action';
import { Service, User } from '../store/main/types';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Form = {
  phone: string;
  service: Service | null;
};

export const Home = ({ navigation: { navigate } }: { navigation: NavigationProp<any> }) => {
  const services = useAppSelector(state => state.main.services);
  const [slideOpen, setSlideOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState<Form>({
    phone: '',
    service: null,
  });
  const [users, setUsers] = useState<User[] | null>(null);
  const dispatch = useAppDispatch();

  const debounceHandler = useCallback(
    debounce((phone: string) => {
      if (phone.length > 2) {
        return dispatch(searchUsers({ phone, service: form.service }))
          .unwrap()
          .then(users => {
            setUsers(users);
            setStatus(users!.length ? '' : 'empty');
          });
      }
      setUsers([]);
      setStatus('');
    }, 300),
    [form]
  );

  useEffect(() => {
    if (form.phone.length > 2) setStatus('loading');
    debounceHandler(form.phone);
  }, [form]);

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          style={{ width: '100%' }}
          title="Сфера услуги"
          titleStyle={{ color: Colors.$textDefault }}
          value={form.service}
          placeholder="Выбрать"
          onChange={(service: Service) => setForm({ ...form, service })}
          containerStyle={{ height: 60 }}
        >
          {services?.map(({ id, title }) => (
            <Picker.Item key={id} value={id} label={title} />
          ))}
        </Picker>
        <Pressable
          style={{ marginLeft: -100, marginBottom: 30 }}
          onPress={() => setForm(state => ({ ...state, service: null }))}
        >
          <Text>Очистить</Text>
        </Pressable>
      </View>
      <Incubator.TextField
        floatingPlaceholder
        onChangeText={(phone: string) => setForm({ ...form, phone })}
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
                ? item.services.map(({ title }) => title).join(', ')
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
