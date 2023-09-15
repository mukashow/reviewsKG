import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ProfileIcon } from '../SearchResult';
import { Camera, Profile } from '../../assets/icon';
import { StackParamList } from './index';
import { Button, Container, Input } from '../../components';

type Props = NativeStackScreenProps<StackParamList, 'EditProfile'>;

export const EditProfile = (props: Props) => {
  return (
    <Container scroll style={{ paddingTop: 32 }}>
      <ProfileIcon style={{ alignSelf: 'center', marginBottom: 11 }}>
        <Profile width={28} height={28} />
        <CameraIcon />
      </ProfileIcon>
      <Input placeholder="Как вас зовут?" mb={8} />
      <Input placeholder="Расскажите о себе" multiline />
      <Button label="Сохранить" mt={16} />
    </Container>
  );
};

const CameraIcon = styled(Camera)`
  position: absolute;
  bottom: -1px;
  right: -1px;
`;
