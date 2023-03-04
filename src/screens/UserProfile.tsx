import React, { FC, useEffect, useRef, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Colors, Text } from 'react-native-ui-lib';
import { Button, Container, Modal } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { Trash } from '../assets/icon';
import { deleteReview, fetchReviews } from '../store/reviews/action';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

type Status = 'loading' | 'error' | 'delete' | '';

export const UserProfile: FC<Props> = ({ navigation, route: { params } }) => {
  const reviews = useAppSelector(state => state.reviews.reviews);
  const [status, setStatus] = useState<Status>('');
  const reviewId = useRef('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStatus('loading');
    dispatch(fetchReviews({ phone: params!.phone }))
      .then(() => setStatus(''))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <Container scroll>
      <Modal
        submitColor="danger"
        title="Удалить отзыв?"
        visible={status === 'delete'}
        close={() => setStatus('')}
        onSubmit={() =>
          dispatch(deleteReview({ id: reviewId.current, phone: params!.phone })).then(() =>
            setStatus('')
          )
        }
      />
      <Button
        label="Оставить отзыв"
        style={{ marginBottom: 40 }}
        onPress={() => navigation.navigate('LeaveReviewToUser', { phone: params!.phone })}
      />
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
                {auth().currentUser?.phoneNumber?.replace('+996', '') === author
                  ? `Я (${auth().currentUser?.phoneNumber?.replace('+996', '')})`
                  : author}
              </Text>
              <Text style={{ fontSize: 12 }}>{createdAt}</Text>
            </View>
            <Text style={{ marginVertical: 5 }}>{review}</Text>
            {rating ? (
              <Text style={{ color: Colors.yellow20 }}>
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
              </Text>
            ) : null}
          </View>
          {author === auth().currentUser?.phoneNumber?.replace('+996', '') ? (
            <Trash
              width={20}
              height={20}
              onPress={() => {
                setStatus('delete');
                reviewId.current = id;
              }}
              style={{ marginLeft: 16 }}
            />
          ) : null}
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
