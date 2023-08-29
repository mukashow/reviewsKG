import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  AccordionSelect,
  Button,
  Container,
  FormInput,
  KeyboardAvoidingView,
  Text,
} from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { sendReview } from '../store/reviews/action';
import { ReviewCreateForm } from '../store/reviews/types';
import { BackButton, Star as StarIcon } from '../assets/icon';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Service, ServiceSelect } from '../store/main/types';
import { phoneNumber } from '../schema';

const Stack = createStackNavigator<StackParamList>();

type Props = NativeStackScreenProps<StackParamList, 'LeaveReviewForm'>;
type StackParamList = {
  LeaveReviewForm: undefined;
  LeaveReviewSelectService: undefined;
};
type FormValues = {
  serviceProviderPhone: string;
  review: string;
  serviceLabel: string;
  rating: number;
};

const LeaveReviewForm = ({ navigation: { navigate }, route: { params } }: Props) => {
  const schema = yup.object().shape({
    serviceProviderPhone: phoneNumber,
    review: yup.string().required('Заполните поле'),
    serviceLabel: yup.string().required('Выберите услугу'),
  });
  const form = useForm<FormValues>({ resolver: yupResolver<yup.AnySchema>(schema) });

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container scroll style={{ paddingTop: 16, paddingBottom: 20 }}>
          <Top>
            <Text
              label="Как вам работа мастера?"
              color="#000"
              fz={20}
              fw="700"
              width={160}
              centered
            />
            <Text label="Оцените от 1го до 5ти" color="#636378" fz={12} mt={10} />
            <StarGrid>
              <Star isActive />
              <Star />
              <Star />
              <Star />
              <Star />
            </StarGrid>
          </Top>
          <FormProvider {...form}>
            <FormInput
              name="serviceProviderPhone"
              error={form.formState.errors.serviceProviderPhone?.message}
              isPhoneNumber
              placeholder="Ваш номер телефона"
              background="#fff"
              mb={6}
            />
            <FormInput
              isSelectBtn
              name="serviceLabel"
              error={form.formState.errors.serviceLabel?.message}
              placeholder="Тип услуги"
              background="#fff"
              mb={6}
              onPressIn={() => navigate('LeaveReviewSelectService')}
            />
            <FormInput
              name="review"
              error={form.formState.errors.review?.message}
              placeholder="Ваш комментарий"
              background="#fff"
              mb={6}
              multiline
              maxLength={320}
              showCharactersCount
              multilineHeight={200}
            />
            <Button
              style={{ marginTop: 24 }}
              label="Оставить отзыв"
              onPress={form.handleSubmit(console.log)}
            />
          </FormProvider>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const LeaveReviewSelectService = ({
  route: { params },
}: NativeStackScreenProps<StackParamList, 'LeaveReviewSelectService'>) => {
  return (
    <Container scroll style={{ paddingVertical: 16 }}>
      <AccordionSelect list={[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} />
    </Container>
  );
};

export const LeaveReview = () => {
  const services = useAppSelector(state => state.main.services);
  const dispatch = useAppDispatch();
  const onSendReview = () => {};

  return (
    <>
      <NavigationContainer
        independent
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: 'transparent' },
        }}
      >
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerLeft: ({ canGoBack }) =>
              canGoBack ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 5, marginLeft: -5 }}
                >
                  <BackButton />
                </TouchableOpacity>
              ) : null,
            headerTitleStyle: { fontSize: 16 },
            cardStyle: { backgroundColor: '#F9F9F9' },
          })}
        >
          <Stack.Screen
            name="LeaveReviewForm"
            component={LeaveReviewForm}
            options={{ title: 'Оставьте отзыв' }}
          />
          <Stack.Screen
            name="LeaveReviewSelectService"
            component={LeaveReviewSelectService}
            options={{ title: 'Тип услуги' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const Top = styled.View`
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  align-items: center;
  margin-bottom: 24px;
`;

const StarGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const Star = styled(StarIcon)`
  margin: 0 6px;
`;
