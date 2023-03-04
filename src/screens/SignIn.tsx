import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Incubator } from 'react-native-ui-lib';
import { Button, Container, Toast } from '../components';

export const SignIn = ({
  navigation: { dispatch, navigate },
}: {
  navigation: NavigationProp<any>;
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState({
    status: 'init',
    message: '',
  });

  const signInWithPhoneNumber = async () => {
    if (phoneNumber.length === 0) {
      return setStatus({ status: 'error', message: 'Заполните номер телефона' });
    }
    if (phoneNumber.length !== 9) {
      return setStatus({ status: 'error', message: 'Неккоректно введен номер' });
    }
    setStatus({ status: 'loading', message: '' });

    try {
      const confirmation = await auth().signInWithPhoneNumber('+996' + phoneNumber);
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'CodeVerification', params: { confirmation } }],
        })
      );
    } catch (e) {
      setStatus({ status: 'error', message: 'Что то пошло не так, попробуйте позже' });
    } finally {
      setStatus({ status: 'init', message: '' });
    }
  };

  useEffect(() => {
    setPhoneNumber(phone => phone.replace(/[^0-9]/g, ''));
  }, [phoneNumber]);

  return (
    <Container customStyle={style.root}>
      <Toast
        text={status.status === 'error' ? status.message : ''}
        onDismiss={() => setStatus({ status: 'init', message: '' })}
      />
      <View>
        <Incubator.TextField
          label="+996"
          placeholder="Введите номер телефона"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          preset="default"
          maxLength={9}
        />
        <Button
          label="Отправить код"
          loading={status.status === 'loading'}
          onPress={signInWithPhoneNumber}
          style={{ marginBottom: 10 }}
        />
        <Button label="Зарегистрироваться" onPress={() => navigate('SignUp')} hyperlink />
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  root: {
    justifyContent: 'center',
    paddingBottom: 200,
  },
});
