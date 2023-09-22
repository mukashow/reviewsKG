import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { AccordionSelect, BottomSheet, Button, Input, Review, Text } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { Phone, Profile, Star, Whatsapp, Tel, SortTop, SortDown } from '../assets/icon';
import { AppStackParamList } from '../types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Service } from '../store/service/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchResult'>;

type Form = {
  phone: string;
  service: Service | null;
};

export const SearchResult = ({ navigation: { navigate } }: Props) => {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState<Form>({
    phone: '',
    service: null,
  });
  const [users, setUsers] = useState<[] | null>(null);
  const dispatch = useAppDispatch();
  const contactSheetRef = useRef<BottomSheetModal>(null);
  const sortSheetRef = useRef<BottomSheetModal>(null);
  // const actionSheet = useRef<ActionSheetRef>(null);

  const debounceHandler = useCallback(
    debounce((phone: string) => {
      if (phone.length > 2) {
        // return dispatch(searchUsers({ phone, service: form.service }))
        //   .unwrap()
        //   .then(users => {
        //     setUsers(users);
        //     setStatus(users!.length ? '' : 'empty');
        //   });
      }
      setUsers([]);
      setStatus('');
    }, 300),
    [form]
  );

  const onPhoneClick = () => {
    contactSheetRef.current!.close();
    Linking.openURL(`tel:+996 999 460 187`);
  };

  useEffect(() => {
    if (form.phone.length > 2) setStatus('loading');
    debounceHandler(form.phone);
  }, [form]);

  return (
    <>
      <ScrollView>
        <Box>
          <Input isPhoneNumber />
        </Box>
        <Box $round="bottom" style={{ marginVertical: 16 }}>
          <Header>
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
          <Button label="Позвонить" Icon={Phone} onPress={contactSheetRef.current?.present} />
          <AboutWorker>
            <Text label="О мастере" fz={16} mb={4} fw="500" />
            <Text
              color="#636378"
              fz={12}
              label="Мастер может многое сделает много за деньги поправит и расскажет"
            />
          </AboutWorker>
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
        </Box>
        <Box $round="top" style={{ marginTop: 12 }}>
          <ReviewHeader>
            <Text label="Оставить отзыв о мастере" fz={16} fw="500" mb={2} />
            <Text label="Напиши о вашем прошлом опыте" fz={12} color="#4D4D4D" mb={16} />
            <Button label="Оставить отзыв" variant="small" />
          </ReviewHeader>
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
      </ScrollView>
      <BottomSheet bottomSheetRef={contactSheetRef} label="Связаться с мастером">
        <Button
          label="Написать в WhatsApp"
          contactLabel="+996 999 460 187"
          variant="contact"
          Icon={Whatsapp}
          mb={8}
        />
        <Button
          label="Позвонить на телефон"
          variant="contact"
          Icon={Tel}
          contactLabel="+996 999 460 187"
          onPress={onPhoneClick}
        />
      </BottomSheet>
      <BottomSheet bottomSheetRef={sortSheetRef} label="Сортировка">
        <Button label="Сначала новые" variant="filter" Icon={SortDown} mb={8} />
        <Button label="Сначала старые" variant="filter" Icon={SortTop} mb={8} />
      </BottomSheet>
    </>
  );
};

export const Box = styled.View<{ $round?: 'bottom' | 'top' | 'both' }>`
  background-color: white;
  border-radius: ${({ $round }) => {
    switch ($round) {
      case 'top':
        return '12px 12px 0 0';
      case 'bottom':
        return '0 0 12px 12px';
      default:
        return '12px';
    }
  }};
  width: 100%;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileIcon = styled.Pressable`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

export const UserName = styled.View`
  flex-direction: row;
  margin-left: 16px;
  align-items: flex-end;
`;

export const AboutWorker = styled.View`
  margin-top: 16px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: #f9f9f9;
`;

const ReviewHeader = styled.View`
  border-radius: 12px;
  background: #f9f9f9;
  padding: 12px;
  align-items: flex-start;
`;
