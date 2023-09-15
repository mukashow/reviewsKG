import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './index';
import { AccordionSelect, Button, Container, Input, Text } from '../../components';
import { View } from 'react-native';

type Props = NativeStackScreenProps<StackParamList, 'EditService'>;

export const EditService = (props: Props) => {
  return (
    <>
      <Container scroll style={{ paddingTop: 28 }}>
        <Text label="Ваша специальность" fz={20} fw="500" mb={8} />
        <Text label="Чем вы занимаетесь?" mb={22} color="#636378" />
        <AccordionSelect
          list={[
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
            { id: 1, title: 'test', list: [] },
          ]}
          onSelect={() => {}}
          selectedService={{ id: 1, title: 'test' }}
        />
      </Container>
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 24 }}>
        <Button label="Сохранить" />
      </View>
    </>
  );
};
