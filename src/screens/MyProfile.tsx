import React, { FC, useEffect, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';
import { Button, Container, SlideUp } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchReviews } from '../store/reviews/action';
import { Trash } from '../assets/icon';
import { deleteService } from '../store/services/action';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

type Status = 'loading' | 'error' | 'delete' | '';

export const MyProfile: FC<Props> = ({ navigation, route: { params } }) => {
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
    dispatch(fetchReviews({ phone: userPhone }))
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
              dispatch(fetchReviews({ phone: userPhone })).then(() => setRefreshing(false));
            }}
          />
        ),
      }}
    >
      <Text style={{ marginBottom: 5 }} text65>
        Услуги
      </Text>
      <View style={{ marginBottom: 10 }}>
        {userServices?.length ? (
          <View>
            {userServices.map(({ id, title }) => (
              <View key={id} style={{ paddingVertical: 10 }}>
                <Text text70>
                  {title} <Trash onPress={() => onDeleteService(id)} />
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text text80 color={Colors.grey20} center style={{ marginVertical: 10 }}>
            Нет услуг
          </Text>
        )}
        <Button label="Добавить" style={{ marginTop: 10 }} onPress={() => setServicesModal(true)} />
      </View>
      <SlideUp visible={servicesModal} setVisible={setServicesModal} />
      <Text style={{ marginBottom: 5 }} text65>
        Отзывы
      </Text>
      {status === 'loading' ? <ActivityIndicator /> : null}
      {reviews && !reviews.length ? (
        <Text text80 color={Colors.grey20} center style={{ marginTop: 20 }}>
          Список отзывов пуст
        </Text>
      ) : null}
      {reviews?.map(({ author, review, rating, createdAt, id }, index, arr) => (
        <View
          key={id}
          style={[
            style.review,
            {
              paddingBottom: index === arr.length - 1 ? 0 : 8,
              borderBottomWidth: index === arr.length - 1 ? 0 : 1,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <View style={style.reviewTop}>
              <Text text70 style={style.reviewTitle}>
                {author}
              </Text>
              <Text style={{ fontSize: 12 }}>{new Date(createdAt).toLocaleDateString()}</Text>
            </View>
            <Text style={{ marginVertical: 5 }}>{review}</Text>
            {rating ? (
              <Text style={{ color: Colors.yellow20 }}>
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </Container>
  );
};

const style = StyleSheet.create({
  review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: Colors.grey50,
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
