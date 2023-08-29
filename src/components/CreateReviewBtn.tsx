import React from 'react';
import { PressableProps, View } from 'react-native';
import styled from 'styled-components/native';
import { Plus } from '../assets/icon/Plus';
import { Text } from './ui/Text';

export const CreateReviewBtn = (props: PressableProps) => {
  return (
    <AddButton {...props}>
      <View style={{ marginTop: -20 }}>
        <Plus />
      </View>
      <Text
        label="Оставить отзыв"
        color="#888DA7"
        fz={11}
        fw="500"
        centered
        style={{ marginBottom: -5 }}
      />
    </AddButton>
  );
};

const AddButton = styled.Pressable`
  width: 80px;
  align-items: center;
  justify-content: space-between;
`;
