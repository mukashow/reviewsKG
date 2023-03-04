import React, { FC } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  customStyle?: ViewStyle;
  scroll?: boolean;
}

export const Container: FC<Props> = ({ children, scroll, customStyle = {} }) => {
  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16 }}
        style={[style.root, customStyle, { paddingVertical: 0 }]}
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
