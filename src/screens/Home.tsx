import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { Input, KeyboardAvoidingView, ServicesFilter, Text } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { Logo } from '../assets/icon';
import { AppStackParamList } from '../types';
import { Service } from '../store/service/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

type Form = {
  phone: string;
  service: Service | null;
};

export const Home = ({ navigation: { navigate } }: Props) => {
  const [slideOpen, setSlideOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState<Form>({
    phone: '',
    service: null,
  });
  const [users, setUsers] = useState<[] | null>(null);
  const dispatch = useAppDispatch();
  const statusbarHeight = useSafeAreaInsets();

  const debounceHandler = useCallback(
    debounce((phone: string) => {
      if (phone.length > 2) {
        // return dispatch(searchUsers({ phone, service: form.service }))
        //   .unwrap()
        //   .then(users => {
        //     setUsers(users);
        //     setStatus(users!.length ? '' : 'empty');
        //   });
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
    <KeyboardAvoidingView>
      <ScrollView>
        <Box style={{ paddingTop: statusbarHeight.top + 48, alignItems: 'center' }}>
          <Logo />
          <Text
            label="Поможем подобрать исполнителя"
            width={248}
            fz={24}
            fw="500"
            centered
            mt={20}
          />
          <Input isPhoneNumber placeholder="Номер телефона исполнителя" mt={24} />
        </Box>
        <Box style={{ marginTop: 16 }}>
          <Text label="Доверьте дело специалисту" fz={20} fw="500" width={150} />
          <Text
            label="Поможем найти подходящего специалиста из 124 000 мастеров"
            fz={14}
            color="#636378"
            mt={8}
            width={300}
          />
          <ServicesFilter style={{ marginTop: 24 }} list={[1, 3, 4, 5, 5]} />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Box = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 24px 20px;
`;
