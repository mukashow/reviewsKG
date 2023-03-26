import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';
import { Colors, Incubator, Picker, Stepper, Text } from 'react-native-ui-lib';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button, Container, Toast } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { sendReview } from '../store/reviews/action';
import { ServiceSelect } from '../store/main/types';
import { ReviewCreateForm } from '../store/reviews/types';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const LeaveReview = ({ navigation, route: { params, name } }: Props) => {
  const services = useAppSelector(state => state.main.services);
  const [reviewTextHeight, setReviewTextHeight] = useState(19);
  const [status, setStatus] = useState({
    status: 'init',
    message: '',
  });

  const [form, setForm] = useState<ReviewCreateForm>({
    serviceProviderPhone: params?.phone || '',
    review: '',
    service: null,
    rating: 0,
  });
  const dispatch = useAppDispatch();

  const onSendReview = () => {
    if (form.serviceProviderPhone.length !== 9) {
      return setStatus({ status: 'error', message: 'Заполните номер телефона' });
    }
    if (!form.review) {
      return setStatus({ status: 'error', message: 'Оставьте отзыв' });
    }
    setStatus({ status: 'loading', message: '' });
    dispatch(sendReview(form)).then(() => {
      if (name === 'LeaveReviewToUser') {
        navigation.goBack();
      }
      setStatus({ status: 'init', message: '' });
    });
  };

  useEffect(() => {
    setForm(state => ({ ...state, phone: state.serviceProviderPhone.replace(/[^0-9]/g, '') }));
  }, [form.serviceProviderPhone]);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      if (name === 'LeaveReview') {
        setForm({
          serviceProviderPhone: '',
          review: '',
          service: null,
          rating: 0,
        });
      }
    });
  }, []);

  return (
    <Container customStyle={{ justifyContent: 'center' }}>
      <Toast
        text={status.status === 'error' ? status.message : ''}
        onDismiss={() => setStatus({ status: 'init', message: '' })}
      />
      <Incubator.TextField
        editable={name === 'LeaveReview'}
        style={{ color: name === 'LeaveReview' ? 'unset' : Colors.grey40 }}
        labelStyle={{ color: name === 'LeaveReview' ? Colors.grey10 : Colors.grey40 }}
        label="+996"
        placeholder="Номер телефона услуги"
        value={form.serviceProviderPhone}
        onChangeText={(serviceProviderPhone: string) =>
          setForm(state => ({ ...state, serviceProviderPhone }))
        }
        keyboardType="numeric"
        preset="default"
        maxLength={9}
      />
      <Incubator.TextField
        fieldStyle={{ height: reviewTextHeight }}
        placeholder="Ваш отзыв"
        onChangeText={(review: string) => setForm(state => ({ ...state, review }))}
        onContentSizeChange={(e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
          setReviewTextHeight(e.nativeEvent.contentSize.height + 8);
        }}
        preset="default"
        multiline
      />
      <Picker
        title="Сфера услуги"
        titleStyle={{ color: Colors.$textDefault }}
        value={form.service}
        placeholder="Выбрать"
        onChange={(service: ServiceSelect) => setForm(state => ({ ...state, service }))}
      >
        {services?.map(({ id, title }) => (
          <Picker.Item key={id} value={id} label={title} />
        ))}
      </Picker>
      <Text style={{ marginBottom: 10 }}>Рейтинг</Text>
      <Stepper
        minValue={1}
        maxValue={5}
        value={form.rating}
        onValueChange={(rating: number) => setForm(state => ({ ...state, rating }))}
      />
      <Button
        loading={status.status === 'loading'}
        label="Добавить"
        style={{ marginTop: 40 }}
        onPress={onSendReview}
      />
    </Container>
  );
};
