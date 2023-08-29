import React from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { Button, Container, FormInput, Text, KeyboardAvoidingView } from '../components';
import { Logo } from '../assets/icon';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AppStackParamList } from '../types';
import { phoneNumber } from '../schema';

type Props = NativeStackScreenProps<AppStackParamList, 'SignIn'>;

type FormValues = {
  phone: string;
};

export const SignIn = ({ navigation: { dispatch, navigate } }: Props) => {
  const schema = yup.object().shape({
    phone: phoneNumber,
  });
  const form = useForm<FormValues>({ resolver: yupResolver<yup.AnySchema>(schema) });

  const onSubmit: SubmitHandler<FormValues> = async values => {
    console.log(values);
    return;
    try {
      const confirmation = await auth().signInWithPhoneNumber('+996');
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'CodeVerification', params: { confirmation } }],
        })
      );
    } catch (e) {
    } finally {
    }
  };

  return (
    <KeyboardAvoidingView>
      <Container
        customStyle={{ paddingTop: 100, paddingBottom: 24, justifyContent: 'space-between' }}
      >
        <View style={{ alignItems: 'center' }}>
          <Logo />
          <Text label="Авторизация" fz={22} fw="500" mt={16} centered />
          <Text
            width={300}
            label="Авторизуйтесть чтобы получить доступ к полной версии приложения"
            color="#636378"
            fz={14}
            mt={4}
            centered
          />
          <FormProvider {...form}>
            <FormInput
              placeholder="Ваш номер телефона"
              isPhoneNumber
              mt={24}
              name="phone"
              error={form.formState.errors.phone?.message}
              keyboardType="number-pad"
            />
          </FormProvider>
          <Button label="Зарегистрироваться" onPress={() => navigate('CodeVerification')} />
        </View>
        <Button label="Далее" onPress={form.handleSubmit(onSubmit)} />
      </Container>
    </KeyboardAvoidingView>
  );
};
