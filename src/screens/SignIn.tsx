import React from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, FormInput, Text, KeyboardAvoidingView } from '../components';
import { Logo } from '../assets/icon';
import { AuthStackParamList } from '../types';
import { phoneNumber } from '../schema';
import { useAppDispatch } from '../store';
import { signIn } from '../store/auth/action';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

type FormValues = {
  phone: string;
};

export const SignIn = ({ navigation }: Props) => {
  const schema = yup.object().shape({
    phone: phoneNumber,
  });
  const form = useForm<FormValues>({ resolver: yupResolver<yup.AnySchema>(schema) });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async values => {
    try {
      await dispatch(signIn(values)).unwrap();
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'CodeVerification' }],
      //   })
      // );
    } catch (e: any) {
      for (const key in e) {
        form.setError(key as keyof FormValues, { message: e[key] });
      }
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
        </View>
        <Button label="Далее" onPress={form.handleSubmit(onSubmit)} />
      </Container>
    </KeyboardAvoidingView>
  );
};
