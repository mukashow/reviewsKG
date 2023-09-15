import { useAppDispatch, useAppSelector } from '../../store';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { deleteService } from '../../store/services/action';
import { fetchReviews } from '../../store/reviews/action';
import { ScrollView, View } from 'react-native';
import { AboutWorker, Box, Header, ProfileIcon, UserName } from '../SearchResult';
import { Profile, SortDown, SortTop, Star } from '../../assets/icon';
import { AccordionSelect, BottomSheet, Button, Review, Text } from '../../components';
import { StackParamList } from './index';

type Status = 'loading' | 'error' | 'delete' | '';
type Props = NativeStackScreenProps<StackParamList, 'ProfileHome'>;

export const ProfileHome = ({ navigation: { navigate }, route: { params } }: Props) => {
  const { userServices, userPhone } = useAppSelector(state => ({
    userPhone: state.auth.phone,
    userServices: state.auth.services,
  }));
  const [refreshing, setRefreshing] = useState(false);
  const reviews = useAppSelector(state => state.reviews.reviews);
  const [status, setStatus] = useState<Status>('');
  const dispatch = useAppDispatch();
  const sortSheetRef = useRef<BottomSheetModal>(null);

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
    <ScrollView style={{ paddingTop: 16 }}>
      <Box $round="both" style={{ marginBottom: 16 }}>
        <Header style={{ marginBottom: 0 }}>
          <ProfileIcon>
            <Profile width={24} height={24} />
          </ProfileIcon>
          <UserName>
            <Text label="Асан Асанов" fz={20} fw="500" />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star isActive style={{ marginRight: 2, marginLeft: 8 }} width={16} height={16} />
              <Text label="4,5" fz={16} color="#414455" />
            </View>
          </UserName>
        </Header>
        <AboutWorker>
          <Text label="О мастере" fz={16} mb={4} fw="500" />
          <Text
            color="#636378"
            fz={12}
            label="Мастер может многое сделает много за деньги поправит и расскажет"
          />
        </AboutWorker>
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
          selectedService={{ id: 1, title: 'a' }}
          list={[
            { id: 1, title: 'car', list: [{ id: 3, title: 'service' }] },
            { id: 3, title: 'travel', list: [{ id: 5, title: 'bag' }] },
          ]}
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
        <Review
          review="loh"
          service={1}
          serviceProviderPhone="043"
          author="belya"
          rating={3}
          id={2}
          createdAt="5353"
        />
      </Box>
      <BottomSheet bottomSheetRef={sortSheetRef} label="Сортировка">
        <Button label="Сначала новые" variant="filter" Icon={SortDown} mb={8} />
        <Button label="Сначала старые" variant="filter" Icon={SortTop} mb={8} />
      </BottomSheet>
    </ScrollView>
  );
};
