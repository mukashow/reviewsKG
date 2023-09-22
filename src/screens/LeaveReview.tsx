import React, { useCallback, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CommonActions,
  NavigationContainer,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  AccordionSelect,
  Button,
  Container,
  FormInput,
  Header,
  KeyboardAvoidingView,
  Text,
} from '../components';
import { Star as StarIcon } from '../assets/icon';
import { phoneNumber } from '../schema';
import { Option } from '../components/AccordionSelect';
import { AppStackParamList } from '../types';
import { MyTheme } from '../App';

const Stack = createNativeStackNavigator<StackParamList>();

type FormValues = {
  serviceProviderPhone: string;
  review: string;
  serviceLabel: string;
  service: number;
  rating: number;
};
type StackParamList = {
  LeaveReviewForm: undefined;
  LeaveReviewSelectService: undefined;
};

interface LeaveReviewFormProps extends NativeStackScreenProps<StackParamList, 'LeaveReviewForm'> {
  goBack: () => void;
  form: UseFormReturn<FormValues>;
}

interface LeaveReviewSelectServiceProps
  extends NativeStackScreenProps<StackParamList, 'LeaveReviewSelectService'> {
  setValue: UseFormSetValue<FormValues>;
  selectedService: Option;
  trigger: UseFormTrigger<FormValues>;
}

const LeaveReviewForm = ({ navigation: { navigate }, goBack, form }: LeaveReviewFormProps) => {
  const rating = form.watch('rating');

  const onSubmit: SubmitHandler<FormValues> = values => {
    goBack();
  };

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
              {[...Array(5)].fill(undefined).map((_, index) => (
                <Star
                  key={index}
                  isActive={rating > index}
                  onPress={() => form.setValue('rating', index + 1)}
                />
              ))}
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
              onPress={form.handleSubmit(onSubmit)}
            />
          </FormProvider>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const LeaveReviewSelectService = ({
  trigger,
  setValue,
  selectedService,
  navigation: { goBack },
}: LeaveReviewSelectServiceProps) => {
  const onSelect = ({ id, title }: Option) => {
    setValue('service', id);
    setValue('serviceLabel', title);
    goBack();
    trigger('serviceLabel');
  };

  return (
    <Container scroll style={{ paddingVertical: 16 }}>
      <AccordionSelect
        onSelect={onSelect}
        selectedService={selectedService}
        list={[
          { id: 1, title: 'car', list: [{ id: 3, title: 'service' }] },
          { id: 2, title: 'human', list: [{ id: 4, title: 'heart' }] },
          { id: 3, title: 'travel', list: [{ id: 5, title: 'bag' }] },
        ]}
      />
    </Container>
  );
};

export const LeaveReview = ({
  navigation: { navigate, addListener },
}: NativeStackScreenProps<AppStackParamList, 'LeaveReview'>) => {
  const schema = yup.object().shape({
    serviceProviderPhone: phoneNumber,
    review: yup.string().required('Заполните поле'),
    serviceLabel: yup.string().required('Выберите услугу'),
  });
  const form = useForm<FormValues>({
    resolver: yupResolver<yup.AnySchema>(schema),
    defaultValues: { rating: 0 },
  });
  const selectedService = { id: form.watch('service'), title: form.watch('serviceLabel') };
  const navigation = useRef<NavigationProp<StackParamList> | null>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        form.reset();
        navigation.current!.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LeaveReviewForm' }],
          })
        );
      };
    }, [])
  );

  return (
    <NavigationContainer independent theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ header: Header }}
        screenListeners={nav => {
          navigation.current = nav.navigation;
          return {};
        }}
      >
        <Stack.Screen name="LeaveReviewForm" options={{ title: 'Оставьте отзыв' }}>
          {props => <LeaveReviewForm {...props} goBack={() => navigate('Home')} form={form} />}
        </Stack.Screen>
        <Stack.Screen name="LeaveReviewSelectService" options={{ title: 'Тип услуги' }}>
          {props => (
            <LeaveReviewSelectService
              {...props}
              selectedService={selectedService}
              trigger={form.trigger}
              setValue={form.setValue}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
