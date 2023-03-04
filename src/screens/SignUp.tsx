import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Incubator, Picker, PickerValue } from 'react-native-ui-lib';
import { Container, Toast } from '../components';

export const SignUp = ({ navigation: { dispatch } }: { navigation: NavigationProp<any> }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState<PickerValue | null>(null);

  const signInWithPhoneNumber = async () => {
    if (phoneNumber.length === 0) return setError('Заполните номер телефона');
    if (phoneNumber.length !== 9) return setError('Неккоректно введен номер');
    if (!category) return setError('Выберите категорию');

    try {
      const confirmation = await auth().signInWithPhoneNumber('+996' + phoneNumber);
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'CodeVerification', params: { confirmation, category } }],
        })
      );
    } catch (e) {
      setError('Что то пошло не так, попробуйте позже');
    }
  };

  useEffect(() => {
    setPhoneNumber(phone => phone.replace(/[^0-9]/g, ''));
  }, [phoneNumber]);

  return (
    <Container customStyle={style.root}>
      <Toast text={error} onDismiss={setError} />
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
        <Picker
          title="Категория к которой относится ваша услуга"
          value={category}
          placeholder="Выбрать"
          onChange={setCategory}
        >
          <Picker.Item value="auto" label="Транспорт" />
          <Picker.Item value="house" label="Недвижимость" />
        </Picker>
        <Button label="Отправить код" enableShadow onPress={signInWithPhoneNumber} />
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
