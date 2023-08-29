import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';
import { Text } from './ui/Text';

interface Props extends ViewProps {
  list: Object[];
}

const Item = ({ index, arr }: { index: number; arr: Object[] }) => {
  return (
    <Root
      {...((index === arr.length - 1 || index === arr.length - 2) && {
        style: { marginBottom: 0 },
      })}
    >
      <Text label="Сантехника" fw="500" />
      <Text label="132 мастера " fz={11} />
      <Image source={require('../assets/images/image.png')} />
    </Root>
  );
};

export const ServicesFilter = ({ list, ...props }: Props) => {
  return (
    <Grid {...props}>
      {list.map((_, index, arr) => (
        <Item key={index} index={index} arr={arr} />
      ))}
    </Grid>
  );
};

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Root = styled.View`
  border-radius: 16px;
  background-color: #f9f9f9;
  padding: 12px;
  position: relative;
  height: 100px;
  width: 48%;
  margin-bottom: 4%;
`;

const Image = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
`;
