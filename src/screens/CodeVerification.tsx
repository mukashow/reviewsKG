import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationProp, RouteProp, StackActions } from '@react-navigation/native';
import { Incubator } from 'react-native-ui-lib';
import { Button, Container, Toast } from '../components';
import { useAppDispatch } from '../store';
import { signIn } from '../store/auth/action';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const CodeVerification = ({ navigation: { dispatch }, route: { params } }: Props) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState({
    status: 'init',
    message: '',
  });
  const reduxDispatch = useAppDispatch();

  const confirmCode = async () => {
    setStatus({ status: 'loading', message: '' });
    try {
      const { user }: FirebaseAuthTypes.UserCredential = await params!.confirmation.confirm(code);
      await reduxDispatch(signIn(user));
    } catch (e) {
      const error = e as ReactNativeFirebase.NativeFirebaseError;
      setStatus({
        status: 'error',
        message:
          error.code === 'auth/invalid-verification-code'
            ? 'Введите правильный код'
            : 'Код подтверждение устарел, попробуйте запросить код заново',
      });
    } finally {
      setStatus({ status: 'init', message: '' });
    }
  };

  useEffect(() => {
    setCode(code => code.replace(/[^0-9]/g, ''));
  }, [code]);

  return (
    <Container customStyle={style.root}>
      <Toast
        text={status.status === 'error' ? status.message : ''}
        onDismiss={() => setStatus({ status: 'init', message: '' })}
      />
      <Incubator.TextField
        placeholder="Введите код подтверждения"
        floatingPlaceholder
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        preset="default"
        maxLength={6}
        autoFocus
      />
      <Button
        disabled={code.length !== 6}
        loading={status.status === 'loading'}
        label="Подтвердить код"
        onPress={confirmCode}
        style={{ marginBottom: 10 }}
      />
      <Button
        label="Ввести номер повторно"
        onPress={() => dispatch(StackActions.replace('SignIn'))}
      />
    </Container>
  );
};

const style = StyleSheet.create({
  root: {
    justifyContent: 'center',
    paddingBottom: 200,
  },
});
