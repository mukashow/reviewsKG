import React from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccordionSelect, Button, Container, KeyboardAvoidingView, Text } from '../components';
import { AppStackParamList } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'SignUpSelectService'>;

export const SignUpSelectService = ({ navigation: { dispatch } }: Props) => {
  const onSubmit = async () => {};

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#F9F9F9' }}>
      <Root scroll>
        <Text label="Ваша специальность" fz={20} fw="500" />
        <Text label="Чем вы занимаетесь?" color="#636378" mt={8} width={270} />
        <AccordionSelect list={[1, 2, 4, 5, 5, 5]} style={{ marginTop: 24 }} />
      </Root>
      <Bottom>
        <Button label="Завершить регистрацию" />
      </Bottom>
    </KeyboardAvoidingView>
  );
};

const Root = styled(Container)`
  padding-top: 36px;
`;

const Bottom = styled.View`
  padding: 20px 20px 24px 20px;
`;
