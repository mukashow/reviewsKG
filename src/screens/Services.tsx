import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { Button, Container } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchMyReviews } from '../store/review/action';
import { Trash } from '../assets/icon';
import { deleteService } from '../store/service/action';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'Services', 'Stack'>;

type Status = 'loading' | 'error' | 'delete' | '';

export const Services: FC<Props> = ({ navigation, route: { params } }) => {
  const { userServices, userPhone } = useAppSelector(state => ({
    userPhone: state.auth.phone,
    userServices: state.auth.services,
  }));
  const [refreshing, setRefreshing] = useState(false);
  const reviews = useAppSelector(state => state.reviews.reviews);
  const [status, setStatus] = useState<Status>('');
  const [servicesModal, setServicesModal] = useState(false);
  const dispatch = useAppDispatch();

  const onDeleteService = (id: number) => {
    dispatch(deleteService(id));
  };

  useEffect(() => {
    setStatus('loading');
    dispatch(fetchMyReviews({ phone: userPhone }))
      .then(() => setStatus(''))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <Container
      scroll
      scrollProps={{
        refreshControl: (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              dispatch(fetchMyReviews({ phone: userPhone })).then(() => setRefreshing(false));
            }}
          />
        ),
      }}
    >
      <View style={{ marginBottom: 10 }}>
        {/*{userServices?.length ? (*/}
        {/*  <View>*/}
        {/*    {userServices.map(({ id, title }) => (*/}
        {/*      <View key={id} style={{ paddingVertical: 10 }}>*/}
        {/*        <Text text70>*/}
        {/*          {title} <Trash onPress={() => onDeleteService(id)} />*/}
        {/*        </Text>*/}
        {/*      </View>*/}
        {/*    ))}*/}
        {/*  </View>*/}
        {/*) : (*/}
        {/*  <Text text80 color={Colors.grey20} center style={{ marginVertical: 10 }}>*/}
        {/*    Нет услуг*/}
        {/*  </Text>*/}
        {/*)}*/}
        <Button label="Добавить" style={{ marginTop: 10 }} onPress={() => setServicesModal(true)} />
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewTitle: {
    fontWeight: '600',
    marginRight: 16,
  },
});
