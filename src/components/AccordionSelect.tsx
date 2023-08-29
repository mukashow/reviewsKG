import React, { useState } from 'react';
import styled from 'styled-components/native';
import { BackButton } from '../assets/icon';
import { Image, LayoutAnimation, View, ViewProps } from 'react-native';
import { Text } from './ui/Text';
import { Checkbox } from './ui/Checkbox';

const conf = {
  duration: 200,
  update: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

interface Props extends ViewProps {
  list: Object[];
}

const Item = ({ index, arr }: { index: number; arr: Object[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Root style={{ marginBottom: index !== arr.length - 1 ? 8 : 0 }}>
      <Top
        onPress={() => {
          LayoutAnimation.configureNext(conf);
          setOpen(!open);
        }}
      >
        <Icon source={require('../assets/images/image.png')} />
        <View>
          <Text label="Работа по дому" color="#151515" fw="500" />
          <Text label="Работа по дому" color="#4D4D4D" fz={12} />
        </View>
        <Arrow $open={open} width={20} height={20} />
      </Top>
      {open && (
        <List>
          <ListItem>
            <Text label="Выбрать все (324)" color="#000" />
            <Checkbox checked />
          </ListItem>
          <ListItem>
            <Text label="Выбрать все (324)" color="#000" />
            <Checkbox checked={false} />
          </ListItem>
        </List>
      )}
    </Root>
  );
};

export const AccordionSelect = ({ list, ...props }: Props) => {
  return (
    <View {...props}>
      {list.map((_, index, arr) => (
        <Item key={index} index={index} arr={arr} />
      ))}
    </View>
  );
};

const Root = styled.View`
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
`;

const Arrow = styled(BackButton)<{ $open: boolean }>`
  transform: rotate(${({ $open }) => ($open ? 90 : 270)}deg);
  margin-left: auto;
`;

const Top = styled.Pressable`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(Image)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const List = styled.View`
  padding-top: 8px;
  margin: 0 10px 10px 10px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const ListItem = styled.Pressable`
  margin-top: 4px;
  border-radius: 8px;
  background: #f9f9f9;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
