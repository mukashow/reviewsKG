import React from 'react';
import styled, { css } from 'styled-components/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackButton } from '../assets/icon';
import { Text } from './ui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../types';

interface Props extends NativeStackHeaderProps {
  variant?: 'border' | 'round';
  background?: Color;
}

export const Header = ({
  navigation: { canGoBack, goBack },
  options: { title },
  variant = 'border',
  background = '#fff',
}: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: top + 5 }} $variant={variant} $background={background}>
      <Root>
        {canGoBack() && <Back onPress={goBack} />}
        <Text label={title || ''} fz={16} color="#090816" fw="500" />
      </Root>
    </Container>
  );
};

type ContainerStyle = {
  $variant: Props['variant'];
  $background: Props['background'];
};

const Container = styled.View<ContainerStyle>`
  background-color: ${({ $background }) => $background};
  padding: 0 16px 10px;
  ${({ $variant }) => {
    switch ($variant) {
      case 'border':
        return css`
          border-bottom-width: 1px;
          border-bottom-color: #f9f9f9;
        `;
      case 'round':
        return css`
          border-bottom-right-radius: 12px;
          border-bottom-left-radius: 12px;
        `;
    }
  }}
`;

const Back = styled(BackButton)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Root = styled.View`
  height: 24px;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
