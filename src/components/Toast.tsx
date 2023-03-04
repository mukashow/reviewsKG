import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { Colors, Text, Toast as ToastUi } from 'react-native-ui-lib';

interface Props {
  text: string;
  onDismiss: Dispatch<SetStateAction<string>>;
}

export const Toast = ({ text, onDismiss }: Props) => {
  return (
    <ToastUi visible={!!text} position="top" autoDismiss={5000} onDismiss={() => onDismiss('')}>
      <View style={{ backgroundColor: Colors.red20, padding: 10 }}>
        <Text center color="white">
          {text}
        </Text>
      </View>
    </ToastUi>
  );
};
