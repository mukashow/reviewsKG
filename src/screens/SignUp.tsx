import React from 'react';
import { View } from 'react-native';
import { Button, Container, Input, KeyboardAvoidingView, Text, Toast } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Link } from '@react-navigation/native';
import { AppStackParamList } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'SignUp'>;

export const SignUp = ({ navigation: { navigate } }: Props) => {
  const onSubmit = async () => {};

  return (
    <KeyboardAvoidingView>
      <Root>
        <View>
          <Text label="Осталось совсем немного" fz={22} fw="500" />
          <Text label="Дополните ваши данные" color="#636378" mt={4} />
          <Input mt={24} placeholder="Как вас зовут?" />
        </View>
        <View>
          <Button label="Начать!" onPress={onSubmit} />
          <Button
            label="Регистрация как исполнитель"
            mt={12}
            variant="gray"
            onPress={() => navigate('SignUpAsPerformer')}
          />
        </View>
      </Root>
    </KeyboardAvoidingView>
  );
};

const Root = styled(Container)`
  padding-top: 28px;
  padding-bottom: 24px;
  justify-content: space-between;
`;
