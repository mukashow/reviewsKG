import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AboutWorker, Box, Header, ProfileIcon, UserName } from '../SearchResult';
import { AccordionSelect, BottomSheet, Button, Review, Text } from '../../components';
import { Profile, SortDown, SortTop, Star } from '../../assets/icon';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteService } from '../../store/service/action';
import { fetchMyReviews, fetchReviewSortKeys } from '../../store/review/action';
import { ThumbService } from '../../store/service/types';
import { StackParamList } from './index';

type Props = NativeStackScreenProps<StackParamList, 'ProfileHome'>;

export const ProfileHome = ({ navigation: { navigate, setParams }, route: { params } }: Props) => {
  const user = useAppSelector(state => state.auth.user);
  const services = useAppSelector(state => state.service.services);
  const reviews = useAppSelector(state => state.reviews.reviews);
  const sort = useAppSelector(state => state.reviews.sort);
  const dispatch = useAppDispatch();
  const sortSheetRef = useRef<BottomSheetModal>(null);

  const onDeleteService = (id: number) => {
    dispatch(deleteService(id));
  };

  const myService = useMemo<ThumbService[]>(() => {
    if (!user || !services) return [];
    // if (!user.service?.parent?.id) return [];
    if (!user.service?.parent?.id) return [];

    return services.find(({ id }) => id === user.service!.parent.id)!.children;
  }, [user, services]);

  useEffect(() => {
    dispatch(fetchReviewSortKeys());
  }, []);

  useEffect(() => {
    const param = Object.entries(params).reduce((str, entry, index) => {
      return str + `${index !== 0 ? '&' : ''}${entry[0]}=${entry[1]}`;
    }, '');
    dispatch(fetchMyReviews(param));
  }, [params]);

  return (
    <ScrollView style={{ paddingTop: 16 }}>
      <Box $round="both" style={{ marginBottom: 16 }}>
        <Header style={{ marginBottom: 0 }}>
          <ProfileIcon>
            <Profile width={24} height={24} />
          </ProfileIcon>
          <UserName>
            <Text label={user.phone} fz={20} fw="500" />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star isActive style={{ marginRight: 2, marginLeft: 8 }} width={16} height={16} />
              <Text label="4,5" fz={16} color="#414455" />
            </View>
          </UserName>
        </Header>
        {user.description && (
          <AboutWorker>
            <Text label="О мастере" fz={16} mb={4} fw="500" />
            <Text color="#636378" fz={12} label={user.description} />
          </AboutWorker>
        )}
        <Button
          label="Редактировать"
          style={{ height: 36 }}
          fz={13}
          mt={16}
          onPress={() => navigate('EditProfile')}
        />
      </Box>
      <Box $round="both">
        <Text label="Что может мастер" fz={16} fw="500" />
        <Text label="Около 70 услуг" fz={12} color="#636378" mb={12} />
        <AccordionSelect
          readonly
          variant="gray"
          onSelect={() => {}}
          selectedService={user?.service?.id}
          list={services?.map(({ children, ...rest }) => ({ ...rest, list: children })) || []}
        />
        <Button
          label="Редактировать"
          style={{ height: 36 }}
          fz={13}
          mt={16}
          onPress={() => navigate('EditService')}
        />
      </Box>
      <Box $round="top" style={{ marginTop: 12 }}>
        <Text label="Отзывы" mt={24} mb={4} fz={20} fw="500" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text label="324 отзыва" color="#414455" fz={16} mr={8} />
          <Star width={16} height={16} isActive />
          <Text label="4,5" color="#414455" fz={16} ml={2} />
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Button
            label="Сначала последние"
            variant="sort"
            mt={12}
            mb={20}
            onPress={sortSheetRef.current?.present}
          />
        </View>
        {reviews?.result.map(review => (
          <Review {...review} key={review.id} />
        ))}
      </Box>
      <BottomSheet bottomSheetRef={sortSheetRef} label="Сортировка">
        {sort?.map(({ id, title, key }) => (
          <Button
            onPress={() => {
              setParams({ ...params, sort: { key, title } });
              sortSheetRef.current!.close();
            }}
            key={id}
            label={title}
            variant="filter"
            Icon={key.match(/createdAt_desc|rating_desc/) ? SortDown : SortTop}
            mb={8}
          />
        ))}
      </BottomSheet>
    </ScrollView>
  );
};
