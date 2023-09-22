import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { BackButton } from '../assets/icon';
import { Image, LayoutAnimation, View, ViewProps } from 'react-native';
import { Text } from './ui/Text';
import { Checkbox } from './ui/Checkbox';
import { ThumbService } from '../store/service/types';

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

type OptionGroup = {
  list: ThumbService[];
} & ThumbService;

interface CommonProps {
  onSelect: (option: ThumbService) => void;
  variant?: 'default' | 'gray';
  readonly?: boolean;
  selectedService?: number;
}

interface Props extends ViewProps, CommonProps {
  list: OptionGroup[];
}

interface ItemProps extends CommonProps {
  title: string;
  index: number;
  list: ThumbService[];
  arr: OptionGroup[];
}

const Item = ({
  index,
  list,
  title,
  onSelect,
  arr,
  selectedService,
  readonly,
  variant = 'default',
}: ItemProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isActive = !!list.find(({ id }) => selectedService === id);
    setOpen(isActive);
  }, []);

  return (
    <Root style={{ marginBottom: index !== arr.length - 1 ? 8 : 0 }} $variant={variant}>
      <Top
        onPress={() => {
          LayoutAnimation.configureNext(conf);
          setOpen(!open);
        }}
      >
        <Icon source={require('../assets/images/image.png')} />
        <View>
          <Text label={title} color="#151515" fw="500" />
        </View>
        <Arrow $open={open} svg={{ width: 20, height: 20 }} />
      </Top>
      {open && (
        <List>
          {list.map(({ id, title }) => (
            <ListItem $variant={variant} key={id} onPress={() => onSelect({ id, title })}>
              <Text label={title} color="#000" />
              {!readonly && <Checkbox checked={selectedService === id} />}
            </ListItem>
          ))}
        </List>
      )}
    </Root>
  );
};

export const AccordionSelect = ({
  list,
  onSelect,
  selectedService,
  variant,
  readonly = false,
  ...props
}: Props) => {
  return (
    <View {...props}>
      {list.map(({ id, title, list }, index, arr) => (
        <Item
          readonly={readonly}
          variant={variant}
          key={id}
          selectedService={selectedService}
          index={index}
          arr={arr}
          title={title}
          list={list}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const Root = styled.View<{ $variant: CommonProps['variant'] }>`
  border-radius: 10px;
  background: ${({ $variant }) => ($variant === 'gray' ? '#f9f9f9' : '#fff')};
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

const ListItem = styled.Pressable<{ $variant: CommonProps['variant'] }>`
  margin-top: 4px;
  border-radius: 8px;
  background: ${({ $variant }) => ($variant === 'gray' ? '#fff' : '#f9f9f9')};
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
