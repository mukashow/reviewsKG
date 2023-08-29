import React, { FC } from 'react';
import { ScrollViewProps, View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: React.ReactNode;
  customStyle?: ViewStyle;
  style?: ViewStyle;
  scroll?: boolean;
  scrollProps?: ScrollViewProps;
  bottomSheet?: boolean;
}

export const Container: FC<Props> = ({
  children,
  scroll,
  customStyle = {},
  style,
  scrollProps = {},
  bottomSheet,
}) => {
  const bottomSheetStyle = { paddingTop: 16, paddingBottom: 40, flex: 0 };

  if (scroll) {
    return (
      <Root
        contentContainerStyle={bottomSheet ? { ...style, ...bottomSheetStyle } : style}
        style={customStyle}
        {...scrollProps}
      >
        {children}
      </Root>
    );
  }
  return (
    <Root as={View} style={[customStyle, style, bottomSheet ? bottomSheetStyle : {}]}>
      {children}
    </Root>
  );
};

const Root = styled.ScrollView`
  padding: 0 20px;
  flex: 1;
`;
