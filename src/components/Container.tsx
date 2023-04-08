import React, { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  customStyle?: ViewStyle;
  scroll?: boolean;
  scrollProps?: ScrollViewProps;
}

export const Container: FC<Props> = ({ children, scroll, customStyle = {}, scrollProps = {} }) => {
  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16 }}
        style={[style.root, customStyle, { paddingVertical: 0 }]}
        {...scrollProps}
      >
        {children}
      </ScrollView>
    );
  }
  return <View style={[style.root, customStyle]}>{children}</View>;
};

const style = StyleSheet.create({
  root: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    flex: 1,
  },
});
