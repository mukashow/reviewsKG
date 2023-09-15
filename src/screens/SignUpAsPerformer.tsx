import React from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Container, Input, KeyboardAvoidingView, Text } from '../components';
import { AppStackParamList } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'SignUpAsPerformer'>;

export const SignUpAsPerformer = ({ navigation: { navigate } }: Props) => {
  const onSubmit = async () => {};

  return (
    <KeyboardAvoidingView>
      <Root scroll customStyle={{ backgroundColor: 'white' }}>
        <Text label="Добро пожаловать" fz={20} fw="500" />
        <Text
          label="Добавьте как можно больше данных о себе"
          color="#636378"
          mt={4}
          width={270}
          centered
        />
        <Input mt={30} placeholder="Как вас зовут?" />
        <Input mt={8} placeholder="Расскажите о себе" multiline />
        <Button label="Далее" mt={8} onPress={() => navigate('SignUpSelectService')} />
      </Root>
    </KeyboardAvoidingView>
  );
};

const Root = styled(Container)`
  padding-top: 36px;
  padding-bottom: 24px;
  align-items: center;
`;
